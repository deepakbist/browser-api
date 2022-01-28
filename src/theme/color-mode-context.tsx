import DarkIcon from "@mui/icons-material/DarkMode";
import LightIcon from "@mui/icons-material/LightMode";
import { IconButton } from "@mui/material";
import { useTheme } from "@mui/system";
import React, { useContext } from "react";

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

export function ColorModeToggle() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <IconButton
      sx={{ ml: 1 }}
      onClick={colorMode.toggleColorMode}
      color="inherit"
    >
      {theme.palette.mode === "dark" ? <LightIcon /> : <DarkIcon />}
    </IconButton>
  );
}
