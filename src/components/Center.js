import styled from "styled-components";

const CenterStyles = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Center = ({ children }) => {
  return <CenterStyles>{children}</CenterStyles>;
};

export default Center;
