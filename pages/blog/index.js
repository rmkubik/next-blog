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

const PostItem = ({ slug, summary }) => {
  return (
    <Section key={slug}>
      <h2>{slug}</h2>
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
        {posts.map(({ slug, summary }) => (
          <PostItem key={slug} slug={slug} summary={summary} />
        ))}
      </PostStyles>
    </BlogStyles>
  );
};

export const getStaticProps = async () => {
  // const slugs = await getAllPostSlugs();
  const posts = await getAllPosts();

  // console.log(posts);

  return {
    props: {
      posts: posts.map((post) => ({ slug: post.slug, summary: post.summary })),
    },
  };
};

export default Blog;
