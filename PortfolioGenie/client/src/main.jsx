import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { GitHubProvider } from './context/GitHubContext';
import { PortfolioProvider } from './context/PortfolioContext'
import "./styles/index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    
      <ThemeProvider>
        <GitHubProvider>
          <PortfolioProvider>
          <App />
          </PortfolioProvider>
        </GitHubProvider>
      </ThemeProvider>
    
  </StrictMode>,
);