import React, { useContext } from "react";

const AppSettingsContext = React.createContext({});

const DEFAULT_OC_INFO = {
  categories: [],
  languages: [],
  currencies: [],
  options: [],
  optionsValues: [],
  countries: [],
  attributes: [],
  attributeGroups: [],
  currencySymbol: "",
  geoZones: [],
};

function AppSettingsProvider({ ocInfo, children }) {
  const opencartInfo = Object.assign({}, DEFAULT_OC_INFO, ocInfo);

  const value = {
    get categories() {
      return opencartInfo.categories;
    },
    get options() {
      return opencartInfo.options;
    },
    get optionsValues() {
      return opencartInfo.optionsValues;
    },
    get languages() {
      return opencartInfo.languages;
    },
    get currencies() {
      return opencartInfo.currencies;
    },
    get currencySymbol() {
      return opencartInfo.currencySymbol;
    },
    get countries() {
      return opencartInfo.countries;
    },
    get attributes() {
      return opencartInfo.attributes;
    },
    get geoZones() {
      return opencartInfo.geoZones;
    },
    get attributeGroups() {
      return opencartInfo.attributeGroups;
    }
  };

  return (
    <AppSettingsContext.Provider value={value}>
      {children}
    </AppSettingsContext.Provider>
  );
}

const AppSettingsConsumer = AppSettingsContext.Consumer;

const useAppSettings = () => useContext(AppSettingsContext);

export {
  AppSettingsContext,
  AppSettingsProvider,
  AppSettingsConsumer,
  useAppSettings,
};
