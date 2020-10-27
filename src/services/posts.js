import fs from "fs";
import path from "path";

import renderToString from "next-mdx-remote/render-to-string";
import matter from "gray-matter";

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

const postsDir = path.join("posts");

const getMdxSourceBySlug = async (slug) => {
  const slugPath = path.join(postsDir, slug);
  const stats = await fs.promises.stat(slugPath);

  let fileContents;

  if (stats.isDirectory()) {
    const indexPath = await getIndexPath(slugPath);

    if (!indexPath) {
      console.error(`There was no index file for the slugPath: ${slugPath}`);
    }

    fileContents = await fs.promises.readFile(indexPath, "utf8");
  } else {
    fileContents = await fs.promises.readFile(slugPath, "utf8");
  }

  const { content, data } = matter(fileContents);

  return {
    frontmatter: data,
    source: await renderToString(content),
  };
};

const getAllPostSlugs = async () => {
  return (
    (await fs.promises.readdir(postsDir))
      // Filter out all hidden dot files
      .filter((fileName) => fileName.charAt(0) !== ".")
      .map((fileName) => path.basename(fileName))
  );
};

export { getMdxSourceBySlug, getAllPostSlugs };
