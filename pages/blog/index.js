import styled from "styled-components";

import { getAllPostSlugs } from "../../src/services/posts";
import Link from "../../src/components/Link";
import ListItem from "../../src/components/ListItem";

const UnorderedListStyles = styled.ul`
  list-style: none;
  padding: 0;
`;

const Blog = ({ slugs }) => {
  return (
    <>
      <h1>{"Games & Code"}</h1>
      <UnorderedListStyles>
        {slugs.map((slug) => (
          <ListItem key={slug}>
            <Link to={`/blog/${slug}`}>{slug}</Link>
          </ListItem>
        ))}
      </UnorderedListStyles>
    </>
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
