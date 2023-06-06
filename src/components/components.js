import Head from "next/head";

import Icon from "./Icon";
import Link from "./Link";
import Section from "./Section";
import Wrapper from "./Wrapper";
import { H1, H2, H3, H4, H5, H6 } from "./headings";
import CodeBlock from "./CodeBlock";
import BlockQuote from "./BlockQuote";
import createImage from "./Image";
import CloudList from "./CloudList";
import Center from "./Center";
import NoSsrIslandMakerEmbed from "./projects/NoSsrIslandMakerEmbed";
import createVideo from "./Video";
import Grid from "./Grid";
import Note from "./Note";

const Anchor = ({ children, href }) => {
  return (
    <Link hideArrow hideDots to={href}>
      {children}
    </Link>
  );
};

const Pre = (props) => <div {...props} />;

const createComponents = ({ imageDir, slug }) => {
  const components = {
    a: Anchor,
    blockquote: BlockQuote,
    Center,
    CloudList,
    code: CodeBlock,
    Grid,
    h1: H1,
    h2: H2,
    h3: H3,
    h4: H4,
    h5: H5,
    h6: H6,
    Head,
    Icon,
    img: createImage({
      imageDir,
      slug,
    }),
    NoSsrIslandMakerEmbed,
    Note,
    pre: Pre,
    Section,
    Video: createVideo({
      imageDir,
      slug,
    }),
    wrapper: Wrapper,
  };

  return components;
};

export default createComponents;
