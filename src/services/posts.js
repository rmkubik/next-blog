import fs from "fs";
import path from "path";

import renderToString from "next-mdx-remote/render-to-string";
import matter from "gray-matter";
import htmlToText from "html-to-text";

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

const postsDir = path.join("posts");

const getFileContents = async (slug) => {
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

const summarize = (html) => {
  const text = htmlToText.fromString(html, {
    hideLinkHrefIfSameAsText: true,
    ignoreHref: true,
    ignoreImage: true,
    noLinkBrackets: true,
    uppercaseHeadings: false,
  });
  const trimmed = text.slice(0, 300);

  return `${trimmed}...`;
};

const getMdxSourceBySlug = async (slug) => {
  const fileContents = await getFileContents(slug);
  const { content, data } = matter(fileContents);
  const source = await renderToString(content);
  const { renderedOutput } = source;

  return {
    frontmatter: data,
    slug,
    source,
    summary: summarize(renderedOutput),
  };
};

const getAllPostSlugs = async () => {
  return (
    (await fs.promises.readdir(postsDir))
      // Filter out all hidden dot files
      .filter((fileName) => fileName.charAt(0) !== ".")
      .map((fileName) => path.basename(fileName, path.extname(fileName)))
  );
};

const getAllPosts = async () => {
  const slugs = await getAllPostSlugs();
  const sourcePromises = slugs.map(getMdxSourceBySlug);

  return Promise.all(sourcePromises);
};

export { getMdxSourceBySlug, getAllPostSlugs, getAllPosts };
