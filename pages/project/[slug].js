import { MDXProvider } from "@mdx-js/react";
import { MDXRemote } from "next-mdx-remote";

import {
  getAllPostSlugs,
  getMdxSourceBySlug,
  getPrevNextSlugs,
} from "../../src/services/posts";
import { SlugContextProvider } from "../../src/services/useSlug";
import { FrontmatterContextProvider } from "../../src/services/useFrontmatter";
import Link from "../../src/components/Link";
import Section from "../../src/components/Section";
import Head from "../../src/components/Head";
import createComponents from "../../src/components/components";

const Post = ({ slug, source, frontmatter, prev, next }) => {
  const components = createComponents({
    imageDir: "projects",
    slug,
  });

  return (
    <SlugContextProvider value={slug}>
      <FrontmatterContextProvider value={frontmatter}>
        <Head description={frontmatter.description} title={frontmatter.title} />
        <Section>
          <h1>{frontmatter.title}</h1>
        </Section>
        <MDXProvider components={components}>
          <MDXRemote {...source} />
        </MDXProvider>
        <Section className="footer">
          {prev ? (
            <Link hideDots to={prev.slug}>{`⭠ ${prev.frontmatter.title}`}</Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link hideDots to={next.slug}>{`${next.frontmatter.title} ⭢`}</Link>
          ) : (
            <div />
          )}
        </Section>
        <style jsx>{`
          :global(section) {
            margin-bottom: 2rem;
          }

          :global(.footer) {
            margin-bottom: 0;

            display: grid;
            grid-template-columns: 1fr 1fr;

            :global(*:last-child) {
              text-align: right;
            }
          }

          h1 {
            margin-bottom: 0.75rem;
          }

          p {
            margin: 0;
          }
        `}</style>
      </FrontmatterContextProvider>
    </SlugContextProvider>
  );
};

export const getStaticProps = async ({ params }) => {
  const { source, frontmatter, readingTime } = await getMdxSourceBySlug(
    "projects",
    params.slug
  );
  const { prev, next } = await getPrevNextSlugs("projects", params.slug);

  return {
    props: {
      frontmatter,
      next: next ? next : null,
      prev: prev ? prev : null,
      readingTime,
      slug: params.slug,
      source,
    },
  };
};

export const getStaticPaths = async () => {
  const slugs = await getAllPostSlugs("projects");

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
