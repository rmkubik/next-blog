import { MDXProvider } from "@mdx-js/react";
import hydrate from "next-mdx-remote/hydrate";

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
import Icon from "../../src/components/Icon";
import Center from "../../src/components/Center";

const Post = ({
  slug,
  source,
  frontmatter,
  readingTime,
  prev,
  next,
  summary,
}) => {
  const components = createComponents({
    imageDir: "posts",
    slug,
  });
  const content = hydrate(source, { components });
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(frontmatter.date));

  return (
    <SlugContextProvider value={slug}>
      <FrontmatterContextProvider value={frontmatter}>
        <Head
          description={frontmatter.description || summary}
          title={frontmatter.title}
        />
        <Section>
          <h1>{frontmatter.title}</h1>
          <p>{formattedDate}</p>
          <p>{readingTime}</p>
        </Section>
        {frontmatter.wip && (
          <Section backgroundColor="gold">
            <Center>
              <Icon>{`🚧`}</Icon>
              <Icon>{`🚧`}</Icon>
              <Icon>{`🚧`}</Icon>
              <p
                style={{
                  flex: 1,
                  textAlign: "center",
                }}
              >
                <b>{`This post is still a work in progress!`}</b>
              </p>
              <Icon>{`🚧`}</Icon>
              <Icon>{`🚧`}</Icon>
              <Icon>{`🚧`}</Icon>
            </Center>
          </Section>
        )}
        <MDXProvider components={components}>{content}</MDXProvider>
        <Section className="footer">
          {prev ? (
            <Link
              hideDots
              to={`/blog/${prev.slug}`}
            >{`⭠ ${prev.frontmatter.title}`}</Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              hideDots
              to={`/blog/${next.slug}`}
            >{`${next.frontmatter.title} ⭢`}</Link>
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
  const components = createComponents({
    imageDir: "posts",
    slug: params.slug,
  });
  const {
    source,
    frontmatter,
    readingTime,
    summary,
  } = await getMdxSourceBySlug("posts", params.slug, components);
  const { prev, next } = await getPrevNextSlugs("posts", params.slug);

  return {
    props: {
      frontmatter,
      next: next ? next : null,
      prev: prev ? prev : null,
      readingTime,
      slug: params.slug,
      source,
      summary,
    },
  };
};

export const getStaticPaths = async () => {
  const slugs = await getAllPostSlugs("posts");

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
