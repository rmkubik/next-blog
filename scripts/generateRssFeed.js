import path from "path";
import { writeFile } from "fs/promises";

import generateRssFeed from "../src/services/generateRssFeed";

const run = async () => {
  const feed = await generateRssFeed("posts");

  const rssPath = path.join("public", "blog", "rss.xml");

  await writeFile(rssPath, feed);
};

run();
