import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    background-color: wheat;
    font-family: Helvetica;
    color: #222;

    font-size: 18px;
    line-height: 1;
  }

  h2 {
    margin-top: 64px;
    padding-bottom: 10px;
    border-bottom: 2px solid black;
    margin-bottom: 32px;
  }

  h3 {
    margin-top: 52px;
    margin-bottom: 16px;
  }

  h4 {
    margin-top: 32px;
    margin-bottom: 12px;
  }

  hr {
    border: 1px solid black;
    margin: 32px 0;
  }

  li {
    margin-bottom: 16px;
  }

  @keyframes headShake {
    0% {
      transform: rotateZ(-1deg);
    }

    20% {
      transform: rotateZ(0);
    }
  }
`;

export default GlobalStyle;
