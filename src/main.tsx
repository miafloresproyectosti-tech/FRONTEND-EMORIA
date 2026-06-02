import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import App from "./App";
import { UserProvider } from "./context/UserContext";
import { EmotionalHistoryProvider } from "./context/EmotionalHistoryContext";

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <React.StrictMode>
    <UserProvider>
      <EmotionalHistoryProvider>
        <App />
      </EmotionalHistoryProvider>
    </UserProvider>
  </React.StrictMode>
);