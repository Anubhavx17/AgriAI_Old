import { StrictMode } from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <I18nextProvider i18n={i18next}>
      <App />
    </I18nextProvider>
  </StrictMode>,
  rootElement
);
