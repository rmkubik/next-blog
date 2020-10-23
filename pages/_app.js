import { MDXProvider } from "@mdx-js/react";
import "normalize.css";
import "../styles/main.scss";
import * as layoutComponents from "../src/layout";
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

function MyApp({ Component, pageProps }) {
  return (
    <MDXProvider components={components}>
      <Component {...pageProps} />
    </MDXProvider>
  );
}

export default MyApp;
