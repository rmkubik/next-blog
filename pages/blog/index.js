import styled from "styled-components";

import { getAllPosts } from "../../src/services/posts";
import Link from "../../src/components/Link";
import Section from "../../src/components/Section";

const PostStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 32px;

  section {
    padding: 32px;
  }
`;

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

const BlogStyles = styled.div`
  h1 {
    margin-bottom: 32px;
  }

  & > *:first-child {
    margin-bottom: 32px;

    h1 {
      margin-bottom: 16px;
    }

    p {
      margin: 0;
    }
  }
`;

const Blog = ({ posts }) => {
  return (
    <BlogStyles>
      <Section>
        <h1>{"Games & Code"}</h1>
        <p>
          {
            "My problem I was having an ambient static noise in my QC35 II’s ONLY when connected to my Macbook Pro, not when connected to my iPhone. Additionally, the “action button” on my headphones that should change noise cancellation levels was non-functional. Skip my debugging steps, and head right to the…"
          }
        </p>
      </Section>
      <PostStyles>
        {posts.map(({ slug, summary, frontmatter, readingTime }) => (
          <PostItem
            frontmatter={frontmatter}
            key={slug}
            readingTime={readingTime}
            slug={slug}
            summary={summary}
          />
        ))}
      </PostStyles>
    </BlogStyles>
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
