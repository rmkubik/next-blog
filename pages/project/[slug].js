import { MDXProvider } from "@mdx-js/react";
import hydrate from "next-mdx-remote/hydrate";

import {
  getAllPostSlugs,
  getMdxSourceBySlug,
  getPrevNextSlugs,
} from "../../src/services/posts";
import { SlugContextProvider, useSlug } from "../../src/services/useSlug";
import { FrontmatterContextProvider } from "../../src/services/useFrontmatter";
import Icon from "../../src/components/Icon";
import Link from "../../src/components/Link";
import Section from "../../src/components/Section";
import Wrapper from "../../src/components/Wrapper";
import { H1, H2, H3, H4, H5, H6 } from "../../src/components/headings";
import CodeBlock from "../../src/components/CodeBlock";
import BlockQuote from "../../src/components/BlockQuote";
import Head from "../../src/components/Head";

const Anchor = ({ children, href }) => {
  return (
    <Link hideArrow hideDots to={href}>
      {children}
    </Link>
  );
};

const Image = ({ children, src, alt, ...rest }) => {
  const relativeStartStripped = src.replace(/^.\//u, "");
  const slug = useSlug();

  return (
    <>
      <img
        alt={alt}
        src={`/images/projects/${slug}/${relativeStartStripped}`}
        {...rest}
      />
      <style jsx>{`
        img {
          max-width: 100%;
          margin-left: auto;
          margin-right: auto;
          display: block;
        }
      `}</style>
    </>
  );
};

const Pre = (props) => <div {...props} />;

const components = {
  a: Anchor,
  blockquote: BlockQuote,
  code: CodeBlock,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  Icon,
  img: Image,
  pre: Pre,
  Section,
  wrapper: Wrapper,
};

const Post = ({ slug, source, frontmatter, prev, next }) => {
  const content = hydrate(source, { components });

  return (
    <SlugContextProvider value={slug}>
      <FrontmatterContextProvider value={frontmatter}>
        <Head title={frontmatter.title} />
        <Section>
          <h1>{frontmatter.title}</h1>
        </Section>
        <MDXProvider components={components}>{content}</MDXProvider>
        <Section>
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

          :global(section:last-child) {
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
    params.slug,
    components
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
