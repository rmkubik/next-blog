import renderToString from "next-mdx-remote/render-to-string";
import matter from "gray-matter";
import fs from "fs";
import path from "path";

async function doesPathExist(path) {
  try {
    await fs.promises.stat(path);
  } catch (err) {
    if (err.code === "ENOENT") {
      return false;
    } else {
      throw err;
    }
  }

  return true;
}

async function getIndexPath(slugPath) {
  const indexMdxPath = path.join(slugPath, "index.mdx");
  if (await doesPathExist(indexMdxPath)) {
    return indexMdxPath;
  }

  const indexMdPath = path.join(slugPath, "index.md");
  if (await doesPathExist(indexMdPath)) {
    return indexMdPath;
  }

  return false;
}

const postsDir = path.join("posts");

async function getMdxSourceBySlug(slug) {
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

  return { frontmatter: data, source: await renderToString(content) };
}

async function getAllPostSlugs() {
  return (
    (await fs.promises.readdir(postsDir))
      // Filter out all hidden dot files
      .filter((fileName) => fileName.charAt(0) !== ".")
      .map((fileName) => path.basename(fileName))
  );
}

export { getMdxSourceBySlug, getAllPostSlugs };
