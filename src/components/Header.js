import Head from "next/head";
import { useEffect, useState } from "react";

import Link from "./Link";

const siteName = "Ryan Kubik";

const Header = ({
  title = siteName,
  previewImage,
  description = "Games & Code",
}) => {
  const [currentUrl, setCurrentUrl] = useState("");

  /**
   * Next.js cannot reference window at build time to get the current URL.
   * Window does not exist during static or server side rendering processes.
   *
   * Instead, we use useEffect to set this meta property at run time.
   */
  useEffect(() => {
    setCurrentUrl(window.location);
  }, []);

  return (
    <>
      <Head>
        <title>{title}</title>
        <link href="/favicon.ico" rel="icon" />

        {/* Twitter specific tags */}
        <meta content="@ryrykubes" key="twsite" property="twitter:site" />
        <meta content="@ryrykubes" key="twhandle" property="twitter:creator" />
        <meta content="summary" key="twcard" property="twitter:card" />

        {/* Open graph tags */}
        <meta content={currentUrl} key="ogUrl" property="og:url" />
        <meta content={previewImage} key="ogimage" property="og:image" />
        <meta content={siteName} key="ogsitename" property="og:site_name" />
        <meta content={title} key="ogtitle" property="og:title" />
        <meta content={description} key="ogdesc" property="og:description" />
      </Head>
      <header>
        <Link hideArrow hideDots to="/">
          {"Ryan Kubik"}
        </Link>
        <Link hideArrow hideDots to="/blog">
          {"Blog"}
        </Link>
        <Link hideArrow hideDots to="https://twitter.com/ryrykubes">
          {"Twitter"}
        </Link>
        <Link hideArrow hideDots to="https://rmkubik.itch.io/">
          {"Games"}
        </Link>
      </header>
      <style jsx>{`
        header {
          display: flex;
          flex-direction: row;
          align-items: center;

          border: 2px solid black;
          box-shadow: black 4px 4px;
          padding: 2rem;
          background-color: white;
          /* background-color: #fff4db; */

          & > :global(*:first-child) {
            flex: 1;
            font-size: 1.2rem;
          }

          & > :global(*:not(:first-child)) {
            border-left: 2px solid black;
            padding: 0.5rem 1rem;
          }

          & > :global(*:not(:first-child):hover) {
            text-decoration: underline;
            cursor: pointer;
          }

          & > :global(*:not(:second-child)) {
            border-left: 2px solid black;
            padding: 0.5rem 1rem;
          }

          :global(a) {
            margin-left: 0;
            color: black;
            text-decoration: none;

            &:hover {
              text-decoration: underline;
            }
          }
        }
      `}</style>
    </>
  );
};

export default Header;
