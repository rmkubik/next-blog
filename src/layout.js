import React, { useRef } from "react";
import NextLink from "next/link";
import { stripIndents } from "common-tags";
// import "../codepen";

const Center = ({ children }) => {
  return <div className="center">{children}</div>;
};

const Section = ({ children, area, color = "white" }) => {
  return (
    <section
      className={area}
      style={{ gridArea: area, backgroundColor: color }}
    >
      {/* <span>🔗</span> */}
      {children}
    </section>
  );
};

const Icon = ({ children }) => <span className="icon">{children}</span>;

const ListItem = ({ children }) => {
  const liRef = useRef();

  const onClick = () => {
    liRef.current.querySelector("a")?.click();
  };

  if (Array.isArray(children)) {
    return (
      <li ref={liRef} onClick={onClick}>
        <p>{children[0]}</p>
        {children.slice(1)}
      </li>
    );
  } else {
    return (
      <li ref={liRef} onClick={onClick}>
        {children}
      </li>
    );
  }
};

const Seedling = ({ inline }) =>
  inline ? (
    <span>🌱</span>
  ) : (
    <p>
      <span>🌱</span> This page is just a seedling. It's a rough and unfinished
      thought. <span>🌱</span>
    </p>
  );
const Growing = ({ inline }) =>
  inline ? (
    <span>🌿</span>
  ) : (
    <p>
      <span>🌿</span> This page is growing. It's becoming more structured and
      thought out. <span>🌿</span>
    </p>
  );
const Mature = ({ inline }) =>
  inline ? (
    <span>🌳</span>
  ) : (
    <p>
      <span>🌳</span> This page is mature. It represents a polished thought or
      concept. <span>🌳</span>
    </p>
  );

const Link = ({ to = "", hideDots = false, hideArrow = false, children }) => {
  if (to.includes("http")) {
    return (
      <>
        <a href={to} className="external-link">
          {children}
          {hideDots || "..."}
        </a>
        {hideArrow || <span className="external-arrow">➜</span>}
      </>
    );
  } else {
    return (
      <NextLink href={to}>
        <>
          {children}
          {hideDots || "..."}
        </>
      </NextLink>
    );
  }
};

const EmailSignup = () => {
  return (
    <div className="email-input">
      <input />
      <button>Subscribe</button>
    </div>
  );
};

const Wrapper = ({
  children,
  metadata: { template } = { template: "header header header" },
}) => {
  return (
    <div
      className="content" /*style={{ gridTemplate: stripIndents(template) }} */
    >
      <Section area="header">
        <h1>
          <Link hideDots={true} hideArrow={true} to="/">
            Ryan Kubik
          </Link>
        </h1>
        <Link hideDots={true} hideArrow={true} to="https://ryankubik.com/blog">
          Blog
        </Link>
        <Link
          hideDots={true}
          hideArrow={true}
          to="https://twitter.com/ryrykubes"
        >
          Twitter
        </Link>
        <Link hideDots={true} hideArrow={true} to="https://rmkubik.itch.io/">
          Games
        </Link>
      </Section>
      {children}
    </div>
  );
};

export {
  Center,
  Section,
  Icon,
  ListItem,
  Seedling,
  Growing,
  Mature,
  Link,
  EmailSignup,
  Wrapper,
};
