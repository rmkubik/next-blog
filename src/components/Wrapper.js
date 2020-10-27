import Section from "./Section";
import Link from "./Link";

const Wrapper = ({
  children,
  // Temporary
  // eslint-disable-next-line no-unused-vars
  metadata: { template } = { template: "header header header" },
}) => {
  return (
    <div
      className="content" /* style={{ gridTemplate: stripIndents(template) }} */
    >
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
      <Section>{children}</Section>
    </div>
  );
};

export default Wrapper;
