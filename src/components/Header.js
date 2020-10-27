import Section from "./Section";
import Link from "./Link";

const Header = () => {
  return (
    <Section area="header">
      <h1>
        <Link hideDots={true} hideArrow={true} to="/">
          Ryan Kubik
        </Link>
      </h1>
      <Link hideDots={true} hideArrow={true} to="https://ryankubik.com/blog">
        Blog
      </Link>
      <Link hideDots={true} hideArrow={true} to="https://twitter.com/ryrykubes">
        Twitter
      </Link>
      <Link hideDots={true} hideArrow={true} to="https://rmkubik.itch.io/">
        Games
      </Link>
    </Section>
  );
};

export default Header;
