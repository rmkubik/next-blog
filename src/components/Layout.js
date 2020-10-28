import styled from "styled-components";

import Header from "./Header";

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
      {children}
    </ContentStyles>
  );
};

export default Wrapper;
