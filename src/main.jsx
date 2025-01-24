import { createTheme, ThemeProvider } from "@mui/material";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { DentAidApp } from "./DentAidApp.jsx";
import "./index.css";

const theme = createTheme({
  typography: {
    fontFamily: "'Poppins', sans-serif", // Cambia la fuente predeterminada
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <DentAidApp />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
