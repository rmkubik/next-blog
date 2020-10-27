import { getAllPostSlugs } from "../../src/services/posts";
import Link from "../../src/components/Link";
import Wrapper from "../../src/components/Wrapper";

const Blog = ({ slugs }) => {
  return (
    <Wrapper>
      <h1>{"Games & Code"}</h1>
      <ul>
        {slugs.map((slug) => (
          <li key={slug}>
            <Link to={`/blog/${slug}`}>{slug}</Link>
          </li>
        ))}
      </ul>
    </Wrapper>
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
