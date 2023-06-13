import Section from "./Section";
import Center from "./Center";
import Icon from "./Icon";

const Footer = () => (
  <>
    <Section className="footer">
      <Center>
        <Icon>{"👋"}</Icon>
      </Center>
    </Section>
    <style jsx>
      {`
        :global(.footer):hover {
          :global(span[role="img"]) {
            transform-origin: bottom center;
            animation-name: swing;
            animation-duration: 500ms;
          }
        }

        @keyframes swing {
          20% {
            transform: rotate3d(0, 0, 1, 15deg);
          }

          40% {
            transform: rotate3d(0, 0, 1, -10deg);
          }

          60% {
            transform: rotate3d(0, 0, 1, 5deg);
          }

          80% {
            transform: rotate3d(0, 0, 1, -5deg);
          }

          to {
            transform: rotate3d(0, 0, 1, 0deg);
          }
        }
      `}
    </style>
  </>
);

export default Footer;
