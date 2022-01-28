import { useState, useMemo, useEffect } from "react";
import { ThemeProvider, CssBaseline, useMediaQuery } from "@mui/material";
import { LightTheme, DarkTheme, DARK, LIGHT } from "./theme/theme";
import Routes from "./routes";
import { ColorModeContext } from "./theme/color-mode-context";

export default function AppRoot() {
  // extracting system theme
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  let defaultMode: typeof DARK | typeof LIGHT;
  if (prefersDarkMode) {
    defaultMode = DARK;
  } else {
    if (localStorage.getItem("theme") === DARK) defaultMode = DARK;
    else defaultMode = LIGHT;
  }

  const [mode, setMode] = useState<typeof DARK | typeof LIGHT>(defaultMode);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          const mode = prevMode === LIGHT ? DARK : LIGHT;
          localStorage.setItem("theme", mode);
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
