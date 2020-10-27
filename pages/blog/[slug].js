import { MDXProvider } from "@mdx-js/react";
import { getAllPostSlugs, getMdxSourceBySlug } from "../../src/posts";
import hydrate from "next-mdx-remote/hydrate";
import { SlugContextProvider, useSlug } from "../../src/useSlug";

import Wrapper from "../../src/components/Wrapper";
import Link from "../../src/components/Link";
import Section from "../../src/components/Section";
import Icon from "../../src/components/Icon";

const components = {
  wrapper: Wrapper,
  a: ({ children, href }) => {
    return <Link to={href}>{children}</Link>;
  },
  img: ({ children, src, ...rest }) => {
    const relativeStartStripped = src.replace(/^.\//, "");
    const slug = useSlug();

    return (
      <img src={`/images/posts/${slug}/${relativeStartStripped}`} {...rest}>
        {children}
      </img>
    );
  },
  Section,
  Icon,
};

const Post = ({ slug, source, frontmatter }) => {
  const content = hydrate(source, { components });

  return (
    <SlugContextProvider value={slug}>
      <MDXProvider components={components}>{content}</MDXProvider>
    </SlugContextProvider>
  );
};

export async function getStaticProps({ params }) {
  const { source, frontmatter } = await getMdxSourceBySlug(params.slug);

  // date needs to be stringified because Next.js cannot serialize
  // Date objects in getStaticProps.
  const { date, ...remainingFrontmatter } = frontmatter;

  return {
    props: {
      slug: params.slug,
      source,
      frontmatter: {
        date: date.toISOString(),
        ...remainingFrontmatter,
      },
    },
  };
}

export async function getStaticPaths() {
  const slugs = await getAllPostSlugs();

  return {
    paths: slugs.map((slug) => {
      return {
        params: {
          slug,
        },
      };
    }),
    fallback: false,
  };
}

export default Post;
