import { createTheme, ThemeProvider } from "@mui/material";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { DentAidApp } from "./DentAidApp.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/store.js";

const theme = createTheme({
  typography: {
    fontFamily: "'Poppins', sans-serif", 
  },
  
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
      <BrowserRouter>
        <DentAidApp />
      </BrowserRouter>
      </Provider>
    </ThemeProvider>
  </StrictMode>
);
