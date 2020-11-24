import Head from "next/head";

import Link from "./Link";

const Header = () => {
  return (
    <>
      <Head>
        <title>{"Ryan Kubik"}</title>
        <link href="/favicon.ico" rel="icon" />
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
