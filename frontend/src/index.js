import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import i18nData from './i18n.json'
import { I18nProvider, createI18n } from 'react-simple-i18n'

const mountPoints = document.querySelectorAll('.foc_increase_total_rules_app') //document.getElementById('foc_increase_total_root')

const parseJsonOr = (json, defaultValue = {}) => {
  try {
    return JSON.parse(json) || defaultValue
  }
  catch (e) {
    return defaultValue
  }
}

Array.from(mountPoints).forEach(rootEl => {
  const state = rootEl.hasAttribute('data-state') && parseJsonOr(rootEl.getAttribute('data-state'), {})
  const ocInfo = rootEl.hasAttribute('data-oc-info') && parseJsonOr(rootEl.getAttribute('data-oc-info'), {})
  const outputName = rootEl.hasAttribute('data-output-name') ? rootEl.getAttribute('data-output-name') : null
  const userLanguage = rootEl.getAttribute('data-language-code') || 'en-gb'

  const lang = i18nData[userLanguage] ? userLanguage : 'en-gb'

  ReactDOM.render(
    <React.StrictMode>
      <I18nProvider i18n={ createI18n(i18nData, { lang }) }>
        <App state={ state } ocInfo={ ocInfo } outputName={ outputName } />
      </I18nProvider>
    </React.StrictMode>,
    rootEl
  );
})


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
