import styled from "styled-components";

import Header from "./Header";
import Section from "./Section";

const ContentStyles = styled.div`
  padding: 20px;

  max-width: 1000px;
  margin: 0 auto;

  header {
    margin-bottom: 32px;
  }
`;

const Wrapper = ({ children }) => {
  return (
    <ContentStyles>
      <Header />
      <Section>{children}</Section>
    </ContentStyles>
  );
};

export default Wrapper;
