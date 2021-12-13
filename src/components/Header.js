import useSiteMetaData from "../services/useSiteMetaData";
import useTheme from "../services/useTheme";

import Link from "./Link";
import Head from "./Head";

const Header = () => {
  const [siteMetaData] = useSiteMetaData();
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <Head {...siteMetaData} />
      <header>
        <Link hideArrow hideDots to="/">
          {"Ryan Kubik"}
        </Link>
        <button onClick={toggleTheme} type="button">
          {theme.themeIcon}
        </button>
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

          border: 2px solid ${theme.borderColor};
          box-shadow: ${theme.borderColor} 4px 4px;
          padding: 2rem;
          background-color: ${theme.sectionColor};
          /* background-color: #fff4db; */

          & > :global(*:first-child) {
            flex: 1;
            font-size: 1.2rem;
          }

          /* Add borders to every link but the left one and first 
             on the right side */
          & > :global(*:not(:first-child):not(:nth-child(2))) {
            border-left: 2px solid ${theme.borderColor};
          }

          /* Decorate right side links */
          & > :global(*:not(:first-child)) {
            padding: 0.5rem 1rem;

            &:hover {
              a {
                /* We don't want this to appear on buttons */
                text-decoration: underline;
              }

              cursor: pointer;
            }
          }

          :global(a) {
            margin-left: 0;
            color: ${theme.fontColor};
            text-decoration: none;

            &:hover {
              text-decoration: underline;
            }
          }

          :global(button) {
            background-color: transparent;
            border: none;
            text-shadow: ${theme.fontColor} 0px 0px 6px;
          }
        }
      `}</style>
    </>
  );
};

export default Header;
