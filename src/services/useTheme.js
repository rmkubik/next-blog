import useLocalStorage from "./useLocalStorage";

const { useState, createContext, useContext } = require("react");

const themes = {
  dark: {
    backgroundColor: "#002",
    backgroundImage: "cartographer.png",
    borderColor: "#669",
    borderShadowColor: "#669",
    fontColor: "#eef",
    hoverColor: "aliceblue",
    overlayColor: "#222",
    sectionColor: "#112",
    themeIcon: "🌒",
  },
  light: {
    backgroundColor: "#ebcfc4",
    backgroundImage: "wavecut.png",
    borderColor: "black",
    borderShadowColor: "black",
    fontColor: "#202129",
    hoverColor: "aliceblue",
    overlayColor: "#222",
    sectionColor: "white",
    themeIcon: "🌞",
  },
};

const ThemeContext = createContext({ theme: themes.light });

const ThemeContextProvider = ({ children }) => {
  const [saveData, setSaveData] = useLocalStorage("com.ryankubik.theme", {
    themeKey: "light",
  });
  const [themeKey, setThemeKey] = useState(saveData.themeKey);

  const theme = themes[themeKey];

  const setAndSaveThemeKey = (newThemeKey) => {
    setThemeKey(newThemeKey);
    setSaveData({ themeKey: newThemeKey });
  };

  const toggleTheme = () => {
    let newThemeKey;

    switch (themeKey) {
      case "dark":
        newThemeKey = "light";

        break;
      case "light":
      default:
        newThemeKey = "dark";

        break;
    }

    setAndSaveThemeKey(newThemeKey);
  };

  return (
    <ThemeContext.Provider
      value={{
        setThemeKey: (newThemeKey) => {
          setAndSaveThemeKey(newThemeKey);
        },
        theme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => useContext(ThemeContext);

export default useTheme;
export { ThemeContextProvider };
