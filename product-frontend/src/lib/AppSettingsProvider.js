import React, { useState, useContext, useMemo, useCallback } from "react";
import { mergeLeft } from "merge-left-utils";
import { RULESET_RESOLVER_ADD_POSITION_VALUE } from "../AppSettings/constants";

const AppSettingsContext = React.createContext({});

const DEFAULT_STATE = {
  rules: [],
};

const RULESET_SHAPE = {
  conditions: [],
  resolve: {
    type: RULESET_RESOLVER_ADD_POSITION_VALUE,
    value: "",
  },
};

const CONDITION_SHAPE = {
  type: "language",
  value: { language_id: -1 },
};

const DEFAULT_OC_INFO = {
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

function AppSettingsProvider({ ocInfo, state: defaultState = {}, children }) {
  const [state, setState] = useState(
    Object.assign({}, DEFAULT_STATE, defaultState)
  );

  const opencartInfo = useMemo(
    () => Object.assign({}, DEFAULT_OC_INFO, ocInfo),
    [ocInfo]
  );

  const addRuleset = useCallback((ruleset) => {
    setState((state) => ({
      ...state,
      rules: [...state.rules, mergeLeft(RULESET_SHAPE, ruleset)],
    }));
  }, []);

  const deleteRuleset = useCallback((rulesetIndex) => {
    setState((state) => ({
      ...state,
      rules: state.rules.filter((_, index) => index !== rulesetIndex),
    }));
  }, []);

  const updateRulesetResolver = useCallback((rulesetIndex, payload) => {
    setState((state) => ({
      ...state,
      rules: state.rules.map((ruleset, index) => {
        if (index === rulesetIndex) {
          return {
            ...ruleset,
            resolve: mergeLeft(ruleset.resolve, payload),
          };
        }
        return ruleset;
      }),
    }));
  }, []);

  const addCondition = useCallback((rulesetIndex) => {
    setState((state) => ({
      ...state,
      rules: state.rules.map((ruleset, index) => {
        if (index === rulesetIndex) {
          return {
            ...ruleset,
            conditions: [...ruleset.conditions, CONDITION_SHAPE],
          };
        }
        return ruleset;
      }),
    }));
  }, []);

  const updateCondition = useCallback(
    ({ rulesetIndex, ruleIndex }, payload) => {
      setState((state) => ({
        ...state,
        rules: state.rules.map((ruleset, index) => {
          if (index === rulesetIndex) {
            const { conditions = [], ...rest } = ruleset;

            return {
              ...rest,
              conditions: conditions.map((condition, index) => {
                if (index === ruleIndex) {
                  return Object.assign({}, CONDITION_SHAPE, condition, payload);
                }
                return condition;
              }),
            };
          }
          return ruleset;
        }),
      }));
    },
    []
  );

  const deleteCondition = useCallback(
    ({ rulesetIndex, ruleIndex }, payload) => {
      setState((state) => ({
        ...state,
        rules: state.rules.map((ruleset, index) => {
          if (index === rulesetIndex) {
            const { conditions = [], ...rest } = ruleset;

            return {
              ...rest,
              conditions: conditions.filter((_, index) => index !== ruleIndex),
            };
          }
          return ruleset;
        }),
      }));
    },
    []
  );

  const value = {
    get rules() {
      return state.rules || [];
    },
    get state() {
      return state || {};
    },
    get options() {
      return opencartInfo.options || {};
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
    },
    resetRulesets() {
      setState(DEFAULT_STATE);
    },
    resetState(newState) {
      setState(mergeLeft(state, newState));
    },
    addRuleset,
    deleteRuleset,
    updateRulesetResolver,
    addCondition,
    updateCondition,
    deleteCondition,
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
  useAppSettings,
  AppSettingsContext,
  AppSettingsProvider,
  AppSettingsConsumer,
};
