import { useEffect } from "react";

import { getAllPosts } from "../../src/services/posts";
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
    <>
      <Section key={slug}>
        <h2>{frontmatter.title}</h2>
        <p>{`${category}${readingTime} - ${formattedDate}`}</p>
        <p>{summary}</p>
        <Link to={`/blog/${slug}`}>{"Read more"}</Link>
      </Section>
    </>
  );
};

const Blog = ({ posts }) => {
  return (
    <div className="blog">
      <Head title={"Games & Code"} />
      <Section>
        <h1>{"Games & Code"}</h1>
        <p>
          {
            "I write about things I learn here. Usually these things are related to programming and making games."
          }
        </p>
      </Section>
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
        .blog {
          h1 {
            margin-bottom: 2rem;
          }

          & > :global(*:first-child) {
            margin-bottom: 2rem;

            h1 {
              margin-bottom: 1rem;
            }

            p {
              margin: 0;
            }
          }
        }

        .posts {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-gap: 2rem;

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
    </div>
  );
};

export const getStaticProps = async () => {
  const posts = await getAllPosts("posts");

  return {
    props: {
      posts,
    },
  };
};

export default Blog;
