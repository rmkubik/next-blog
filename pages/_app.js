import "normalize.css";

import Layout from "../src/components/Layout";
import { SiteMetaDataProvider } from "../src/services/useSiteMetaData";

const siteName = "Ryan Kubik";

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <SiteMetaDataProvider
        value={{
          currentUrl: process.env.VERCEL_URL,
          description: undefined,
          previewImage: "/images/logo-512x512.png",
          siteName,
          title: siteName,
          twitterHandle: "ryrykubes",
        }}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SiteMetaDataProvider>
      {/* eslint-disable-next-line react/jsx-sort-props */}
      <style jsx global>{`
        body {
          margin: 0;
          background-color: #ebcfc4;
          background-image: url("/images/wavecut.png");
          font-family: Helvetica;
          /* color: #222; */
          color: #202129;

          font-size: 18px;
          line-height: 1;
        }

        h2 {
          margin-top: 3.25rem;
          padding-bottom: 0.65rem;
          border-bottom: 2px solid black;
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
          border: 1px solid black;
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

export default MyApp;
