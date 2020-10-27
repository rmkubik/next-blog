import Head from "next/head";
import styled from "styled-components";

import Link from "./Link";

const HeaderStyles = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;

  border: 2px solid black;
  box-shadow: black 4px 4px;
  padding: 32px;
  background-color: white;

  & > *:first-child {
    flex: 1;
    font-size: 1.6em;
    font-weight: bold;
  }

  & > *:not(:first-child) {
    border-left: 2px solid black;
    padding: 8px 16px;
  }

  & > *:not(:first-child):hover {
    text-decoration: underline;
    cursor: pointer;
  }

  & > *:not(:second-child) {
    border-left: 2px solid black;
    padding: 8px 16px;
  }

  & a {
    margin-left: 0;
    color: black;
    text-decoration: none;
  }

  & a:hover {
    text-decoration: underline;
  }
`;

const Header = () => {
  return (
    <>
      <Head>
        <title>{"Ryan Kubik"}</title>
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <HeaderStyles>
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
      </HeaderStyles>
    </>
  );
};

export default Header;
