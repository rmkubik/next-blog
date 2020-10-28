import styled from "styled-components";

const EmailStyles = styled.div`
  display: flex;
  flex-direction: row;

  & > *:first-child {
    flex: 1;
    margin-right: 8px;
    padding: 8px;
    border: 2px black solid;
    border-radius: 4px;
    background-color: white;
  }

  & > button {
    background-color: black;
    color: white;
    border: 2px black solid;
    border-radius: 4px;
    cursor: pointer;
  }

  & > button:hover {
    transform: scale(1.1);
    transition-timing-function: ease-in-out;
    transition-duration: 100ms;
  }
`;

const EmailSignup = () => {
  return (
    <EmailStyles>
      <input />
      <button type="button">{"Subscribe"}</button>
    </EmailStyles>
  );
};

export default EmailSignup;
