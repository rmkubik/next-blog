import NextLink from "next/link";

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
        <a>
          {children}
          {hideDots || "..."}
        </a>
      </NextLink>
    );
  }
};

export default Link;
