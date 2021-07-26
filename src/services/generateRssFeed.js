import { writeFile } from "fs/promises";
import path from "path";

import { Feed } from "feed";

import { getAllPosts } from "./posts";

const generateRssFeedData = async (postsDir) => {
  const baseUrl = "https://ryankubik.com/blog";
  const author = {
    link: "https://twitter.com/ryrykubes",
    name: "Ryan Kubik",
  };

  // Construct a new Feed object
  const feed = new Feed({
    author,
    description:
      "I make video games, usually with JavaScript! I write here about things I learn during that process.",
    feedLinks: {
      rss2: `${baseUrl}/rss.xml`,
    },
    id: baseUrl,
    language: "en",
    link: baseUrl,
    title: "Ryan Kubik's Blog",
  });

  const posts = await getAllPosts(postsDir);

  // Add each article to the feed
  posts.forEach((post) => {
    const {
      source: { renderedOutput },
      slug,
      frontmatter: { date, desc, title },
    } = post;
    const url = `${baseUrl}/${slug}`;

    feed.addItem({
      author: [author],
      content: renderedOutput,
      date: new Date(date),
      description: desc,
      id: url,
      link: url,
      title,
    });
  });

  return feed.rss2();
};

const generateRssFeed = async () => {
  const feed = await generateRssFeedData("posts");

  const rssPath = path.join("public", "blog", "rss.xml");

  await writeFile(rssPath, feed);
};

export default generateRssFeed;
