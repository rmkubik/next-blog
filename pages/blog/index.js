import styled from "styled-components";

import { getAllPostSlugs } from "../../src/services/posts";
import Link from "../../src/components/Link";
import Section from "../../src/components/Section";

const PostStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 32px;
`;

const PostItem = ({ slug }) => {
  return (
    <Section key={slug}>
      <h2>{slug}</h2>
      <p>
        {
          "My problem I was having an ambient static noise in my QC35 II’s ONLY when connected to my Macbook Pro, not when connected to my iPhone. Additionally, the “action button” on my headphones that should change noise cancellation levels was non-functional. Skip my debugging steps, and head right to the…"
        }
      </p>
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

  /* ul {
    list-style: none;
    padding: 0;
  } */
`;

const Blog = ({ slugs }) => {
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
        {slugs.map((slug) => (
          <PostItem key={slug} slug={slug} />
        ))}
      </PostStyles>
    </BlogStyles>
  );
};

export const getStaticProps = async () => {
  const slugs = await getAllPostSlugs();

  return {
    props: {
      slugs,
    },
  };
};

export default Blog;
