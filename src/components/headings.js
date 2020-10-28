import styled from "styled-components";

import { slugify } from "../services/utils";

const HeadingStyles = styled.div`
  position: relative;

  a:hover {
    visibility: visible;
  }

  &:hover {
    span {
      visibility: visible;
    }
  }

  a {
    position: absolute;
    top: 0;
    left: 0;
    transform: translateX(-100%);
    padding-right: 4px;
    text-decoration: none;

    span {
      visibility: hidden;
    }
  }
`;

const Heading = ({ children }) => {
  const id = slugify(children);

  return (
    <HeadingStyles>
      <a href={`#${id}`} id={id}>
        <span>{"#"}</span>
      </a>
      {children}
    </HeadingStyles>
  );
};

const H1 = ({ children, ...props }) => (
  <h1 {...props}>
    <Heading>{children}</Heading>
  </h1>
);

const H2 = ({ children, ...props }) => (
  <h2 {...props}>
    <Heading>{children}</Heading>
  </h2>
);

const H3 = ({ children, ...props }) => (
  <h3 {...props}>
    <Heading>{children}</Heading>
  </h3>
);

const H4 = ({ children, ...props }) => (
  <h4 {...props}>
    <Heading>{children}</Heading>
  </h4>
);

const H5 = ({ children, ...props }) => (
  <h5 {...props}>
    <Heading>{children}</Heading>
  </h5>
);

const H6 = ({ children, ...props }) => (
  <h6 {...props}>
    <Heading>{children}</Heading>
  </h6>
);

export { H1, H2, H3, H4, H5, H6 };
