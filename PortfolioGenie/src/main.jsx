import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { GitHubProvider } from './context/GitHubContext';
import "./styles/index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <GitHubProvider>
          <App />
        </GitHubProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);