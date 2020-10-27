import { ThemeProvider } from "styled-components";
import "normalize.css";

import "../styles/main.scss";
import GlobalStyles from "../src/styles/GlobalStyles";
import Wrapper from "../src/components/Wrapper";

const MyApp = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={{ color: "lime" }}>
      <GlobalStyles />
      <Wrapper>
        <Component {...pageProps} />
      </Wrapper>
    </ThemeProvider>
  );
};

export default MyApp;
