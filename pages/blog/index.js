import { getAllPostSlugs } from "../../src/services/posts";
import Link from "../../src/components/Link";

const Blog = ({ slugs }) => {
  return (
    <>
      <h1>{"Games & Code"}</h1>
      <ul>
        {slugs.map((slug) => (
          <li key={slug}>
            <Link to={`/blog/${slug}`}>{slug}</Link>
          </li>
        ))}
      </ul>
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
