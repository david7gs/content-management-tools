import React from "react";
import MyContextProvider from "./store/mcTools_context.jsx";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./assets/styles/index.scss";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <MyContextProvider>
      <App />
    </MyContextProvider>
  </React.StrictMode>,
);
