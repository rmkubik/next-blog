import Section from "./Section";
import Center from "./Center";
import Icon from "./Icon";

const Footer = () => (
  <>
    <Section>
      <Center>
        <Icon>{"👋"}</Icon>
      </Center>
    </Section>
    <style global jsx>
      {`
        section:hover {
          span[role="img"] {
            transform-origin: bottom center;
            animation-name: swing;
            animation-duration: 500ms;
          }
        }
      `}
    </style>
  </>
);

export default Footer;
