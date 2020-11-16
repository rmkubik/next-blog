import { MDXProvider } from "@mdx-js/react";
import hydrate from "next-mdx-remote/hydrate";
import styled from "styled-components";

import { getAllPostSlugs, getMdxSourceBySlug } from "../../src/services/posts";
import { SlugContextProvider, useSlug } from "../../src/services/useSlug";
import { FrontmatterContextProvider } from "../../src/services/useFrontmatter";
import Icon from "../../src/components/Icon";
import Link from "../../src/components/Link";
import Section from "../../src/components/Section";
import Wrapper from "../../src/components/Wrapper";
import { H1, H2, H3, H4, H5, H6 } from "../../src/components/headings";
import CodeBlock from "../../src/components/CodeBlock";
import BlockQuote from "../../src/components/BlockQuote";

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

const PostHeaderStyles = styled.div`
  margin-bottom: 32px;

  h1 {
    margin-bottom: 16px;
  }

  p {
    margin: 0;
  }
`;

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
  pre: (props) => <div {...props} />,
  Section,
  wrapper: Wrapper,
};

const Post = ({ slug, source, frontmatter, readingTime }) => {
  const content = hydrate(source, { components });
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(frontmatter.date));

  return (
    <SlugContextProvider value={slug}>
      <FrontmatterContextProvider value={frontmatter}>
        <PostHeaderStyles>
          <Section>
            <h1>{frontmatter.title}</h1>
            <p>{formattedDate}</p>
            <p>{readingTime}</p>
          </Section>
        </PostHeaderStyles>
        <MDXProvider components={components}>{content}</MDXProvider>
      </FrontmatterContextProvider>
    </SlugContextProvider>
  );
};

export const getStaticProps = async ({ params }) => {
  const { source, frontmatter, readingTime } = await getMdxSourceBySlug(
    params.slug,
    components
  );

  return {
    props: {
      frontmatter,
      readingTime,
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
