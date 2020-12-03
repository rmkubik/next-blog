import Icon from "./Icon";
import Link from "./Link";
import Section from "./Section";
import Wrapper from "./Wrapper";
import { H1, H2, H3, H4, H5, H6 } from "./headings";
import CodeBlock from "./CodeBlock";
import BlockQuote from "./BlockQuote";
import createImage from "./Image";

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
    code: CodeBlock,
    h1: H1,
    h2: H2,
    h3: H3,
    h4: H4,
    h5: H5,
    h6: H6,
    Icon,
    img: createImage({
      imageDir,
      slug,
    }),
    pre: Pre,
    Section,
    wrapper: Wrapper,
  };

  return components;
};

export default createComponents;
