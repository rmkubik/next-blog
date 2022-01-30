import "normalize.css";
import { useRouter } from "next/router";

import Layout from "../src/components/Layout";
import { SiteMetaDataProvider } from "../src/services/useSiteMetaData";
import useTheme, { ThemeContextProvider } from "../src/services/useTheme";

const siteName = "Ryan Kubik";

const App = ({ Component, pageProps }) => {
  const { theme } = useTheme();

  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      {/* eslint-disable-next-line react/jsx-sort-props */}
      <style jsx global>{`
        body {
          margin: 0;
          background-color: ${theme.backgroundColor};
          background-image: url("/images/${theme.backgroundImage}");
          font-family: Helvetica;
          color: ${theme.fontColor};

          font-size: 18px;
          line-height: 1.25;
        }

        h2 {
          margin-top: 3.25rem;
          padding-bottom: 0.65rem;
          border-bottom: 2px solid ${theme.borderColor};
          margin-bottom: 2rem;
        }

        h3 {
          margin-top: 2.875rem;
          margin-bottom: 1rem;
        }

        h4 {
          margin-top: 2rem;
          margin-bottom: 0.75rem;
        }

        hr {
          border: 1px solid ${theme.borderColor};
          margin: 2rem 0;
        }

        li {
          margin-bottom: 1rem;
        }

        ul ul {
          margin-block-start: 1em;
          margin-block-end: 1em;
        }

        /* Allow links to wrap if they're a long continuous string */
        a {
          white-space: pre-wrap; /* CSS3 */
          white-space: -moz-pre-wrap; /* Mozilla, since 1999 */
          white-space: -pre-wrap; /* Opera 4-6 */
          white-space: -o-pre-wrap; /* Opera 7 */
          word-wrap: break-word; /* Internet Explorer 5.5+ */

          color: ${theme.anchorColor};

          &:visited {
            color: ${theme.anchorColorVisited};
          }
        }

        @keyframes headShake {
          0% {
            transform: rotateZ(-1deg);
          }

          20% {
            transform: rotateZ(0);
          }
        }
      `}</style>
    </>
  );
};

const AppWithProviders = ({ Component, pageProps }) => {
  const router = useRouter();

  return (
    <SiteMetaDataProvider
      value={{
        currentUrl: `${process.env.VERCEL_URL}${router.pathname}`,
        description: undefined,
        previewImage: `${process.env.VERCEL_URL}/images/logo-512x512.png`,
        siteName,
        title: siteName,
        twitterHandle: "ryrykubes",
      }}
    >
      <ThemeContextProvider>
        <App Component={Component} pageProps={pageProps} />
      </ThemeContextProvider>
    </SiteMetaDataProvider>
  );
};

export default AppWithProviders;
