import { MDXProvider } from "@mdx-js/react";
import React from "react";
import { getAllPostSlugs, getMdxSourceBySlug } from "../../lib/posts";
import hydrate from "next-mdx-remote/hydrate";

import * as layoutComponents from "../../src/layout";
const { ListItem, Wrapper, Link, ...shortcodes } = layoutComponents;

const components = {
  li: ListItem,
  wrapper: Wrapper,
  a: ({ children, href }) => {
    return <Link to={href}>{children}</Link>;
  },
  // expose following components as shortcodes
  Link,
  ...shortcodes,
};

const Post = ({ slug, source, frontmatter }) => {
  const content = hydrate(source, { components });

  return <MDXProvider components={components}>{content}</MDXProvider>;
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
