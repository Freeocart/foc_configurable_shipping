import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { parseJsonOr } from "./lib/helpers";
import { ConfigProvider } from "./lib/AppSettingsProvider";
import { I18nProvider, createI18n } from "react-simple-i18n";

import i18nData from "./i18n.json";

const rootEl = document.getElementById(
  "product-based-foc-configurable-shipping"
);

const state =
  rootEl.hasAttribute("data-state") &&
  parseJsonOr(rootEl.getAttribute("data-state"), {});
console.log("state", state);
const ocInfo =
  rootEl.hasAttribute("data-oc-info") &&
  parseJsonOr(rootEl.getAttribute("data-oc-info"), {});
const outputName = rootEl.hasAttribute("data-output-name")
  ? rootEl.getAttribute("data-output-name")
  : null;
const userLanguage = rootEl.getAttribute("data-language-code") || "en-gb";
const lang = i18nData[userLanguage] ? userLanguage : "en-gb";

ReactDOM.render(
  <React.StrictMode>
    <I18nProvider i18n={createI18n(i18nData, { lang })}>
      <ConfigProvider state={state} ocInfo={ocInfo}>
        <App outputName={outputName} />
      </ConfigProvider>
    </I18nProvider>
  </React.StrictMode>,
  rootEl
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
