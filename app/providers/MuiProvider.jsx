"use client";

import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useTheme } from "../context/ThemeContext";

export default function MuiProvider({ children }) {
  const { theme } = useTheme();

  const muiTheme = createTheme({
    palette: {
      mode: theme, // 🔥 DARK / LIGHT
    },
  });

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}
