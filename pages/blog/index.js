import styled from "styled-components";

import { getAllPostSlugs } from "../../src/services/posts";
import Link from "../../src/components/Link";

const PostItemStyles = styled.li`
  margin-bottom: 64px;
`;

const PostItem = ({ slug }) => {
  return (
    <PostItemStyles>
      <h2>{slug}</h2>
      <p>
        {
          "My problem I was having an ambient static noise in my QC35 II’s ONLY when connected to my Macbook Pro, not when connected to my iPhone. Additionally, the “action button” on my headphones that should change noise cancellation levels was non-functional. Skip my debugging steps, and head right to the…"
        }
      </p>
      <Link to={`/blog/${slug}`}>{"Read more"}</Link>
    </PostItemStyles>
  );
};

const BlogStyles = styled.div`
  h1 {
    margin-bottom: 64px;
  }

  ul {
    list-style: none;
    padding: 0;
  }
`;

const Blog = ({ slugs }) => {
  return (
    <BlogStyles>
      <h1>{"Games & Code"}</h1>
      <ul>
        {slugs.map((slug) => (
          <PostItem key={slug} slug={slug} />
        ))}
      </ul>
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
