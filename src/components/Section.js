import styled from "styled-components";

const SectionStyles = styled.section`
  border: 2px solid black;
  box-shadow: black 4px 4px;
  padding: 32px 64px;
  background-color: white;

  & > :first-child {
    margin-top: 0;
  }

  & > p {
    line-height: 1.5;
  }

  & > a {
    margin-left: 16px;
    color: black;
    text-decoration: none;
    cursor: pointer;
  }

  span.external-arrow {
    margin-left: 16px;
  }

  & > a:hover {
    text-decoration: underline;
  }
`;

const Section = ({ children, area, color = "white" }) => {
  return (
    <SectionStyles
      className={area}
      style={{
        backgroundColor: color,
        gridArea: area,
      }}
    >
      {/* <span>🔗</span> */}
      {children}
    </SectionStyles>
  );
};

export default Section;
