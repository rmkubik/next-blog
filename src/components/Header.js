import Section from "./Section";
import Link from "./Link";

const Header = () => {
  return (
    <Section area="header">
      <h1>
        <Link hideArrow hideDots to="/">
          {"Ryan Kubik"}
        </Link>
      </h1>
      <Link hideArrow hideDots to="https://ryankubik.com/blog">
        {"Blog"}
      </Link>
      <Link hideArrow hideDots to="https://twitter.com/ryrykubes">
        {"Twitter"}
      </Link>
      <Link hideArrow hideDots to="https://rmkubik.itch.io/">
        {"Games"}
      </Link>
    </Section>
  );
};

export default Header;
