import styled from "styled-components";

const IconStyles = styled.span`
  text-shadow: 2px 2px 0 black;
`;

const Icon = ({ children }) => (
  <IconStyles aria-hidden role="img">
    {children}
  </IconStyles>
);

export default Icon;
