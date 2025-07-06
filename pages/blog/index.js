import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { getAllPosts } from "../../src/services/posts";
import generateRssFeed from "../../src/services/generateRssFeed";
import Link from "../../src/components/Link";
import Section from "../../src/components/Section";
import Head from "../../src/components/Head";

const PostItem = ({ slug, summary, frontmatter, readingTime }) => {
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(frontmatter.date));
  const category = frontmatter.category
    ? `${frontmatter.category.toUpperCase()} - `
    : "";

  return (
    <Section key={slug}>
      <h2>{frontmatter.title}</h2>
      <p>{`${category}${readingTime} - ${formattedDate}`}</p>
      <p>{summary}</p>
      <Link to={`/blog/${slug}`}>{"Read more"}</Link>
    </Section>
  );
};

const Posts = ({ posts }) => {
  return (
    <>
      <div className="posts">
        {posts.map(({ slug, summary, frontmatter, readingTime }) => (
          <PostItem
            frontmatter={frontmatter}
            key={slug}
            readingTime={readingTime}
            slug={slug}
            summary={summary}
          />
        ))}
      </div>
      <style jsx>{`
        .posts {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-gap: 2rem;

          // screen size md
          @media (max-width: 768px) {
            grid-template-columns: 1fr;
            grid-gap: 1rem;
          }

          :global(section) {
            padding: 2rem;
            display: flex;
            flex-direction: column;

            & > :global(:nth-child(2)) {
              margin: 0;
            }

            & > :global(:last-child) {
              margin-top: auto;
            }
          }
        }
      `}</style>
    </>
  );
};

const Tag = ({ children, tag, onSelect, selectedTag }) => {
  const spanRef = useRef();
  const handleClick = useCallback(() => {
    onSelect(tag);
  }, [tag, onSelect]);

  useEffect(() => {
    if (tag === selectedTag) {
      spanRef.current.classList.add("selected");
    } else {
      spanRef.current.classList.remove("selected");
    }
  }, [tag, selectedTag]);

  return (
    <>
      <span
        onClick={handleClick}
        onKeyDown={handleClick}
        ref={spanRef}
        role="button"
        tabIndex={0}
      >
        {children}
      </span>
      <style jsx>{`
        span {
          cursor: pointer;
          background-color: aliceblue;

          &:hover,
          &.selected {
            background-color: blue;
            color: white;

            display: inline-block;
            transform: rotate(-6deg);
          }
        }
      `}</style>
    </>
  );
};

const FEATURED_SLUGS = new Set([
  "cognitive-overload-drop-duchy",
  "apline-js-spoiler",
  "js13k-2021-rocket-jockey",
  "wildfire-swap-inspiration",
  "eslint-internal-state",
]);
const Blog = ({ posts }) => {
  const [filter, setFilter] = useState("featured");

  const featuredPosts = useMemo(() => {
    switch (filter) {
      case "featured":
        return posts.filter((post) => FEATURED_SLUGS.has(post.slug));
      default:
        return posts.filter((post) => post.frontmatter.tags?.includes(filter));
    }
  }, [posts, filter]);

  const remainingPosts = posts.filter((post) => !featuredPosts.includes(post));

  return (
    <div className="blog">
      <Head title="Words words words" />
      <Section className="intro">
        <h1>{"Words words words"}</h1>
        <p className="tags">
          <Tag onSelect={setFilter} selectedTag={filter} tag="software">
            Software
          </Tag>{" "}
          and{" "}
          <Tag onSelect={setFilter} selectedTag={filter} tag="games">
            games
          </Tag>{" "}
          and{" "}
          <Tag onSelect={setFilter} selectedTag={filter} tag="books">
            books
          </Tag>{" "}
          and{" "}
          <Tag onSelect={setFilter} selectedTag={filter} tag="featured">
            featured
          </Tag>{" "}
          words
        </p>
      </Section>
      <Posts posts={featuredPosts} />
      <Section className="intro">
        <h2>{"Other words"}</h2>
        <p>{"Everything else, in chronological order"}</p>
      </Section>
      <Posts posts={remainingPosts} />
      <style jsx>{`
        :global(.intro) {
          margin-bottom: 2rem;

          h1,
          h2 {
            margin-bottom: 1rem;
          }

          p {
            margin: 0;
          }
        }

        :global(.posts) {
          margin-bottom: 2rem;
        }
      `}</style>
    </div>
  );
};

export const getStaticProps = async () => {
  const posts = await getAllPosts("posts");

  /**
   * Generate blog/rss.xml as a side effect of the static
   * rendering of this /blog index.js page's creation.
   *
   * Inspiration:
   * https://ashleemboyer.com/how-i-added-an-rss-feed-to-my-nextjs-site
   */
  await generateRssFeed("posts");

  return {
    props: {
      posts,
    },
  };
};

export default Blog;
