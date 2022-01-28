import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

export const LightTheme = createTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
  },
});

export const DarkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export const DARK = "dark";
export const LIGHT = "light";
