import React, { useState, useContext } from "react";

import {
  RULES_TOTAL_SET_MAX_INCREASE_VALUE,
  RULES_TOTAL_SET_MIN_INCREASE_VALUE,
  RULES_TOTAL_SET_MIN_NON_ZERO_INCREASE_VALUE,
  RULES_TOTAL_SUM_INCREASE_VALUES,
  PRODUCT_INCREASE_STRATEGY_SUM,
  PRODUCT_INCREASE_STRATEGY_MIN,
  PRODUCT_INCREASE_STRATEGY_MIN_NON_ZERO,
  PRODUCT_INCREASE_STRATEGY_MAX,
  COST_INCREASE_MODE_SUM,
  COST_INCREASE_MODE_MAX,
  COST_INCREASE_MODE_MIN,
  COST_INCREASE_MODE_MIN_NON_ZERO,
  COST_INCREASE_MODE_NON_ZERO_INCREASE,
} from "../config/constants";

const VALID_TOTAL_MODES = [
  RULES_TOTAL_SET_MAX_INCREASE_VALUE,
  RULES_TOTAL_SET_MIN_INCREASE_VALUE,
  RULES_TOTAL_SET_MIN_NON_ZERO_INCREASE_VALUE,
  RULES_TOTAL_SUM_INCREASE_VALUES,
];

const VALID_PRODUCT_INCREASE_STRATEGIES = [
  PRODUCT_INCREASE_STRATEGY_SUM,
  PRODUCT_INCREASE_STRATEGY_MIN,
  PRODUCT_INCREASE_STRATEGY_MIN_NON_ZERO,
  PRODUCT_INCREASE_STRATEGY_MAX,
];

const VALID_COST_INCREASE_MODES = [
  COST_INCREASE_MODE_SUM,
  COST_INCREASE_MODE_MAX,
  COST_INCREASE_MODE_MIN,
  COST_INCREASE_MODE_MIN_NON_ZERO,
  COST_INCREASE_MODE_NON_ZERO_INCREASE
]

const AppSettingsContext = React.createContext({});

const DEFAULT_STATE = {
  label: {},
  group: {},
  totalMode: RULES_TOTAL_SET_MAX_INCREASE_VALUE,
  productIncreaseStrategy: PRODUCT_INCREASE_STRATEGY_MAX,
  costIncreaseMode: COST_INCREASE_MODE_SUM,
  disableOnZero: false,
  geozone: null,
  rulesets: {},
};

const DEFAULT_RULESET = {
  label: {},
  useLabel: false,
  once: true,
  increase: 0,
  rules: [],
};

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

function AppSettingsProvider({ ocInfo, state: defaultState = {}, children }) {
  const [state, setState] = useState(
    Object.assign({}, DEFAULT_STATE, defaultState)
  );

  const opencartInfo = Object.assign({}, DEFAULT_OC_INFO, ocInfo);

  const getRuleset = (id) => state.rulesets[id];

  const setRulesets = (rulesets) => {
    setState({
      ...state,
      rulesets,
    });
  };

  const updateRuleset = (id, rulesetData = {}) => {
    const ruleset = getRuleset(id) || {};
    const rules = [...(ruleset.rules || []), ...(rulesetData.rules || [])];

    setRulesets({
      ...state.rulesets,
      [id]: {
        ...ruleset,
        ...rulesetData,
        rules,
      },
    });
  };

  const addNewRuleset = () => {
    const newId = Date.now();
    updateRuleset(newId, DEFAULT_RULESET);
  };

  const addNewRule = (rulesetId, type) => {
    const ruleset = getRuleset(rulesetId);

    updateRuleset(rulesetId, {
      ...ruleset,
      rules: [{ type }],
    });
  };

  const deleteRuleset = (id) => {
    const {
      rulesets: { [id]: _, ...rulesets },
      ...rest
    } = state;
    setState({
      ...rest,
      rulesets,
    });
  };

  const deleteRule = (rulesetId, ruleToDelete) => {
    const ruleset = getRuleset(rulesetId);

    setRulesets({
      ...state.rulesets,
      [rulesetId]: {
        ...ruleset,
        rules: ruleset.rules.filter((rule) => rule !== ruleToDelete),
      },
    });
  };

  const updateRule = (rulesetId, oldRule, rule) => {
    const ruleset = getRuleset(rulesetId);

    const rules = ruleset.rules.map((r) => {
      if (r === oldRule) {
        return {
          ...oldRule,
          ...rule,
        };
      }
      return r;
    });

    setRulesets({
      ...state.rulesets,
      [rulesetId]: {
        ...ruleset,
        rules,
      },
    });
  };

  const setTotalMode = (totalMode) => {
    if (VALID_TOTAL_MODES.includes(parseInt(totalMode))) {
      setState({
        ...state,
        totalMode,
      });
    }
  };

  const setProductIncreaseStrategy = (productIncreaseStrategy) => {
    if (
      VALID_PRODUCT_INCREASE_STRATEGIES.includes(
        parseInt(productIncreaseStrategy)
      )
    ) {
      setState({
        ...state,
        productIncreaseStrategy,
      });
    }
  };

  const setCostIncreaseMode = (costIncreaseMode) => {
    if (
      VALID_COST_INCREASE_MODES.includes(
        parseInt(costIncreaseMode)
      )
    ) {
      setState({
        ...state,
        costIncreaseMode,
      });
    }
  };

  const setLabel = (label = "") => {
    setState({ ...state, label })
  }

  const setGroup = (group = "") => {
    setState({ ...state, group })
  }

  const setDisableOnZero = (nextDisableOnZero) => {
    setState({ ...state, disableOnZero: !!nextDisableOnZero})
  }

  const setGeoZone = (geozone = null) => {
    setState({ ...state, geozone })
  }

  const value = {
    get state() {
      return state;
    },
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
    },
    get rulesets() {
      return state.rulesets;
    },
    resetRulesets() {
      setRulesets({});
    },
    get label () {
      return state.label
    },
    get group () {
      return state.group
    },
    get totalMode() {
      return state.totalMode;
    },
    get costIncreaseMode() {
      return state.costIncreaseMode
    },
    get productIncreaseStrategy() {
      return state.productIncreaseStrategy;
    },
    get disableOnZero() {
      return state.disableOnZero;
    },
    get geoZone() {
      return state.geozone
    },
    setGeoZone,
    setDisableOnZero,
    setRulesets,
    setLabel,
    setGroup,
    setTotalMode,
    setCostIncreaseMode,
    setProductIncreaseStrategy,
    getRuleset,
    updateRuleset,
    addNewRuleset,
    deleteRuleset,
    addNewRule,
    deleteRule,
    updateRule,
    resetState(newState) {
      setState(Object.assign({}, DEFAULT_STATE, state, newState));
    },
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
