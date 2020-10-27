import Section from "./Section";
import Link from "./Link";

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
      <Section>{children}</Section>
    </div>
  );
};

export default Wrapper;
