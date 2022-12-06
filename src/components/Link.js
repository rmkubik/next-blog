import NextLink from "next/link";

const Link = ({ to = "", hideDots = false, hideArrow = false, children }) => {
  if (to.includes("http")) {
    return (
      <>
        <a className="external-link" href={to}>
          {children}
          {hideDots || "..."}
        </a>
        {hideArrow || <span className="external-arrow">{"➜"}</span>}
      </>
    );
  }

  if (to.startsWith("#")) {
    return (
      <a href={to}>
        {children}
        {hideDots || "..."}
      </a>
    );
  }

  return (
    <NextLink href={to}>
      {/* Next.js applies the href attribute for us. */}
      <a>
        {children}
        {hideDots || "..."}
      </a>
    </NextLink>
  );
};

export default Link;
