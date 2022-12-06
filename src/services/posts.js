import fs from "fs";
import path from "path";

import { serialize } from "next-mdx-remote/serialize";
import matter from "gray-matter";
import dateFnsCompareDesc from "date-fns/compareDesc";
import readingTime from "reading-time";
import { remark } from "remark";
import remarkMdx from "remark-mdx";
import strip from "remark-mdx-to-plain-text";

import { forceDateToTimeZone } from "./utils";

const doesPathExist = async (targetPath) => {
  try {
    await fs.promises.stat(targetPath);
  } catch (error) {
    if (error.code === "ENOENT") {
      return false;
    }

    throw error;
  }

  return true;
};

const getIndexPath = async (slugPath) => {
  const indexMdxPath = path.join(slugPath, "index.mdx");

  if (await doesPathExist(indexMdxPath)) {
    return indexMdxPath;
  }

  const indexMdPath = path.join(slugPath, "index.md");

  if (await doesPathExist(indexMdPath)) {
    return indexMdPath;
  }

  return false;
};

const getPostPath = async (slugPath) => {
  const mdSlugPath = `${slugPath}.md`;

  if (await doesPathExist(mdSlugPath)) {
    return mdSlugPath;
  }

  const mdxSlugPath = `${slugPath}.mdx`;

  if (await doesPathExist(mdxSlugPath)) {
    return mdxSlugPath;
  }

  return false;
};

const getFileContents = async (postsDir, slug) => {
  const slugPath = path.join(postsDir, slug);

  const postPath = await getPostPath(slugPath);

  if (postPath) {
    return fs.promises.readFile(postPath, "utf8");
  }

  const indexPath = await getIndexPath(slugPath);

  if (indexPath) {
    return fs.promises.readFile(indexPath, "utf8");
  }

  console.error(`There was no index file for the slugPath: ${slugPath}`);

  return "";
};

const summarize = async (mdxString) => {
  let text;

  await remark()
    .use(remarkMdx)
    .use(strip)
    .process(mdxString, (err, file) => {
      if (err) throw err;

      text = String(file);
    });
  const trimmed = text.slice(0, 300);

  // console.log({ text, trimmed });

  return `${trimmed}...`;
};

const getFrontmatter = async (postsDir, slug) => {
  const fileContents = await getFileContents(postsDir, slug);
  const { data } = matter(fileContents);

  return {
    frontmatter: data,
  };
};

const fixFrontmatter = (frontmatter) => {
  const { date: utcDate, ...remainingFrontmatter } = frontmatter;

  /**
   * Dates are parsed by gray-matter as UTC-0:00 if no time information
   * is added to the frontmatter field.
   *
   * Because this project doesn't make use of the time component of dates,
   * we'll remove this information and coerce all frontmatter dates to
   * PST.
   */
  let date = forceDateToTimeZone(utcDate, "PST");

  /**
   * date needs to be stringified because Next.js cannot serialize
   * Date objects in getStaticProps.
   */
  date = date.toISOString();

  return {
    date,
    ...remainingFrontmatter,
  };
};

/**
 * Image paths in MDX should be valid URLs. Even though
 * filenames can have spaces in them, MDX doesn't recognize
 * that as valid since it's an invalid URL.
 *
 * Ideally, image paths just wouldn't have spaces in them,
 * but we can't guarantee that.
 *
 * This function will search for a string matching an image
 * embed and use built in JavaScript URL encode.
 */
const fixImageUrls = (content) => {
  const imageEmbedRegex = /!\[.+?\]\((.+?)\)/gu;

  // Copy the string with repeat
  let output = content.repeat(1);
  let match;

  while (true) {
    /**
     * Get the next matching imageEmbed.
     *
     * The regex maintains an internal cursor as it compares so
     * subsequent calls will grab the next match.
     */
    match = imageEmbedRegex.exec(content);

    // eslint-disable-next-line unicorn/no-null
    if (match === null) {
      break;
    }

    const [originalImageEmbed, filePath] = match;
    const encodedFilePath = encodeURI(filePath);

    const filePathRegex = /\(.+\)/u;
    const updatedImageEmbed = originalImageEmbed.replace(
      filePathRegex,
      `(${encodedFilePath})`
    );

    output = output.replace(originalImageEmbed, updatedImageEmbed);
  }

  return output;
};

const getMdxSourceBySlug = async (postsDir, slug) => {
  const fileContents = await getFileContents(postsDir, slug);
  const { content, data } = matter(fileContents);
  const imageFixedContent = fixImageUrls(content);
  const source = await serialize(imageFixedContent);
  const { compiledSource } = source;
  const readingTimeStats = readingTime(compiledSource);

  return {
    frontmatter: fixFrontmatter(data),
    readingTime: readingTimeStats.text,
    slug,
    source,
    summary: await summarize(imageFixedContent),
  };
};

const readDir = async (dir) => {
  const fileNames = await fs.promises.readdir(dir);

  return (
    fileNames
      // Filter out all hidden dot files
      .filter((fileName) => fileName.charAt(0) !== ".")
      .map((fileName) => path.basename(fileName, path.extname(fileName)))
  );
};

const getAllPostSlugs = readDir;

const getAllPosts = async (postsDir) => {
  const slugs = await getAllPostSlugs(postsDir);
  const sourcePromises = slugs.map((slug) =>
    getMdxSourceBySlug(postsDir, slug)
  );
  const posts = await Promise.all(sourcePromises);

  posts.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date);
    const dateB = new Date(b.frontmatter.date);

    return dateFnsCompareDesc(dateA, dateB);
  });

  return posts;
};

const getPageMetadataBySlug = async (root, slug) => {
  const metadataPath = path.join("pages", root, slug, "metadata.json");

  if (!(await doesPathExist(metadataPath))) {
    return undefined;
  }

  const metadataContents = await fs.promises.readFile(metadataPath);
  const metadata = JSON.parse(metadataContents);

  return metadata;
};

const getAllPageMetadata = async (root) => {
  const rootPath = path.join("pages", root);
  const slugs = await readDir(rootPath);
  const metadataPromises = slugs.map((slug) =>
    getPageMetadataBySlug(root, slug)
  );

  const metadatas = await Promise.all(metadataPromises);

  return metadatas.filter((metadata) => metadata !== undefined);
};

const getPrevNextSlugs = async (postsDir, targetSlug) => {
  const slugs = await getAllPostSlugs(postsDir);
  const filePromises = slugs.map(async (slug) => {
    const frontmatter = await getFrontmatter(postsDir, slug);

    return {
      ...frontmatter,
      slug,
    };
  });
  const files = await Promise.all(filePromises);
  const sortedFiles = files.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date);
    const dateB = new Date(b.frontmatter.date);

    return dateFnsCompareDesc(dateA, dateB);
  });

  const slugIndex = sortedFiles.findIndex((file) => file.slug === targetSlug);

  // eslint-disable-next-line unicorn/no-null
  const prev = slugIndex === 0 ? null : files[slugIndex - 1];

  // eslint-disable-next-line unicorn/no-null
  const next = slugIndex === files.length - 1 ? null : files[slugIndex + 1];

  return {
    next: next && {
      frontmatter: fixFrontmatter(next.frontmatter),
      slug: next.slug,
    },
    prev: prev && {
      frontmatter: fixFrontmatter(prev.frontmatter),
      slug: prev.slug,
    },
  };
};

const getMdxSourceBySlugs = (directory, slugs) => {
  const postPromises = slugs.map(async (slug) => {
    const parsedDetails = await getMdxSourceBySlug(directory, slug, {});

    return {
      ...parsedDetails,
    };
  });

  return Promise.all(postPromises);
};

export {
  getMdxSourceBySlug,
  getMdxSourceBySlugs,
  getPageMetadataBySlug,
  getAllPageMetadata,
  getAllPostSlugs,
  getAllPosts,
  getPrevNextSlugs,
};
