import { useState, useMemo } from "react";
import { ThemeProvider, CssBaseline, useMediaQuery } from "@mui/material";
import { LightTheme, DarkTheme, ThemeType, DARK, LIGHT } from "./theme/theme";
import Routes from "./routes";
import { ColorModeContext } from "./theme/color-mode-context";

export default function AppRoot() {
  // extracting system theme
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const defaultMode =
    prefersDarkMode || localStorage.getItem("theme") === DARK ? DARK : LIGHT;
  const [mode, setMode] = useState<typeof DARK | typeof LIGHT>(
    prefersDarkMode ? DARK : LIGHT
  );

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          const mode = prevMode === LIGHT ? DARK : LIGHT;
          return mode;
        });
      },
    }),
    []
  );

  const theme = useMemo(() => {
    return mode === LIGHT ? LightTheme : DarkTheme;
  }, [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
