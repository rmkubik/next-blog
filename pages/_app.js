import { ThemeProvider } from "styled-components";
import "normalize.css";

import GlobalStyles from "../src/styles/GlobalStyles";
import Layout from "../src/components/Layout";

/**
 * TODO:
 * - add link buttons to every header
 * - auto add ids to every header for linking purposes, esp. in markdown
 * - generate summaries of blog posts
 * - calculate read times of each post
 * - make blog posts display well next
 * - rethink main blog page, 2 column grid? collapse into 1 col for mobile?
 * - add personal intro/blurb below games & code
 * - sort posts by frontmatter dates
 * - support categories from frontmatter
 * - actually use the frontmatter tags for sorting?
 * - add search via algolia somehow?
 *
 * - home page?
 * - games/projects page?
 * - 404 page
 */

const MyApp = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={{ color: "lime" }}>
      <GlobalStyles />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
};

export default MyApp;
