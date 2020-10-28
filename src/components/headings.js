import styled from "styled-components";

// https://medium.com/@mhagemann/the-ultimate-way-to-slugify-a-url-string-in-javascript-b8e4a0d849e1
const slugify = (string) => {
  const a =
    "àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;";
  const b =
    "aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------";
  const p = new RegExp(a.split("").join("|"), "gu");

  return string
    .toString()
    .toLowerCase()
    .replace(/\s+/gu, "-") // Replace spaces with -
    .replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/gu, "-and-") // Replace & with 'and'
    .replace(/[^\w-]+/gu, "") // Remove all non-word characters
    .replace(/--+/gu, "-") // Replace multiple - with single -
    .replace(/^-+/u, "") // Trim - from start of text
    .replace(/-+$/u, ""); // Trim - from end of text
};

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
