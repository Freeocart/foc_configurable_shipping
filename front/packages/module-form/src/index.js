import React from "react";
import ReactDOM from "react-dom";

import * as serviceWorker from "./serviceWorker";
import { parseJsonOr } from 'common/functions'

import App from "./App";
import { AppSettingsProvider } from "./lib/AppSettings";
import { I18nProvider, createI18n } from "react-simple-i18n";

import i18nData from "./i18n.json";

import "./index.css";
import "common/stylesheet.css";

const mountPoints = document.querySelectorAll(".foc_increase_total_rules_app");

Array.from(mountPoints).forEach((rootEl) => {
  const state =
    rootEl.hasAttribute("data-state") &&
    parseJsonOr(rootEl.getAttribute("data-state"), {});
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
        <AppSettingsProvider state={state} ocInfo={ocInfo}>
          <App outputName={outputName} />
        </AppSettingsProvider>
      </I18nProvider>
    </React.StrictMode>,
    rootEl
  );
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
