import { createTheme, ThemeProvider } from "@mui/material";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router";
import { DentAidApp } from "./DentAidApp.jsx";
import "./index.css";
import { store } from "./store/store.js";

const theme = createTheme({
  typography: {
    fontFamily: "'Poppins', sans-serif",
  },

  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

createRoot(document.getElementById("root")).render(
  /*   <StrictMode> */
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <BrowserRouter>
        <DentAidApp />
      </BrowserRouter>
    </Provider>
  </ThemeProvider>
  /*   </StrictMode> */
);
