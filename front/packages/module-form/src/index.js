import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { AppSettingsProvider } from "./lib/AppSettings";
import { I18nProvider, createI18n } from "react-simple-i18n";

import { isLanguageSupported, loadCommonLanguageData } from "common/i18n";
import { parseJsonOr } from "common/functions";

import "common/stylesheet.css";
import "./index.css";

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

  const lang = isLanguageSupported(userLanguage) ? userLanguage : "en-gb";

  Promise.all([loadCommonLanguageData(lang), import(`./i18n/${lang}.json`)])
    .then(([commonLanguageData, appLanguageData]) => {
      const i18nData = {
        [lang]: Object.assign(
          {},
          commonLanguageData.default,
          appLanguageData.default
        ),
      };

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
    })
    .catch(console.error);
});
