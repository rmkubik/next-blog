import { getAllPosts } from "../../src/services/posts";
import Link from "../../src/components/Link";
import Section from "../../src/components/Section";

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
      <Section>
        <h1>{"Games & Code"}</h1>
        <p>
          {
            "My problem I was having an ambient static noise in my QC35 II’s ONLY when connected to my Macbook Pro, not when connected to my iPhone. Additionally, the “action button” on my headphones that should change noise cancellation levels was non-functional. Skip my debugging steps, and head right to the…"
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
  const posts = await getAllPosts();

  return {
    props: {
      posts,
    },
  };
};

export default Blog;
