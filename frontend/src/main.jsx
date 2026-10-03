// Imports React StrictMode for development checks.
import { StrictMode } from "react";

// Imports the React DOM rendering function.
import { createRoot } from "react-dom/client";

// Imports BrowserRouter to enable client-side routing.
import { BrowserRouter } from "react-router-dom";

// Imports the main App component.
import App from "./App.jsx";

// Imports the global CSS styles.
import "./index.css";

// Finds the root HTML element and renders the React application.
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* Enables routing throughout the application. */}
    <BrowserRouter>
      {/* Displays the main application component. */}
      <App />
    </BrowserRouter>
  </StrictMode>
);