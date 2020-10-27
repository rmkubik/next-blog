import { MDXProvider } from "@mdx-js/react";
import hydrate from "next-mdx-remote/hydrate";

import { getAllPostSlugs, getMdxSourceBySlug } from "../../src/services/posts";
import { SlugContextProvider, useSlug } from "../../src/services/useSlug";
import Icon from "../../src/components/Icon";
import Link from "../../src/components/Link";
import Section from "../../src/components/Section";
import Wrapper from "../../src/components/Wrapper";

const Anchor = ({ children, href }) => {
  return <Link to={href}>{children}</Link>;
};

const Image = ({ children, src, alt, ...rest }) => {
  const relativeStartStripped = src.replace(/^.\//u, "");
  const slug = useSlug();

  return (
    <img
      alt={alt}
      src={`/images/posts/${slug}/${relativeStartStripped}`}
      {...rest}
    />
  );
};

const components = {
  a: Anchor,
  Icon,
  img: Image,
  Section,
  wrapper: Wrapper,
};

const Post = ({ slug, source, frontmatter }) => {
  const content = hydrate(source, { components });

  return (
    <SlugContextProvider value={slug}>
      <MDXProvider components={components}>{content}</MDXProvider>
    </SlugContextProvider>
  );
};

export const getStaticProps = async ({ params }) => {
  const { source, frontmatter } = await getMdxSourceBySlug(params.slug);

  /*
   * date needs to be stringified because Next.js cannot serialize
   * Date objects in getStaticProps.
   */
  const { date, ...remainingFrontmatter } = frontmatter;

  return {
    props: {
      frontmatter: {
        date: date.toISOString(),
        ...remainingFrontmatter,
      },
      slug: params.slug,
      source,
    },
  };
};

export const getStaticPaths = async () => {
  const slugs = await getAllPostSlugs();

  return {
    fallback: false,
    paths: slugs.map((slug) => {
      return {
        params: {
          slug,
        },
      };
    }),
  };
};

export default Post;
