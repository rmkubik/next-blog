import { ThemeProvider } from "styled-components";
import "normalize.css";
import "../styles/main.scss";

const MyApp = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={{ color: "lime" }}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default MyApp;
