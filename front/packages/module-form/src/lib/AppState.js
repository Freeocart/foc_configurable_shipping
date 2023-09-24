import React, { useState, useContext, useMemo } from "react";

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
import { id } from "common/functions";
import merge from "lodash.merge";

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

const AppStateContext = React.createContext({});

const DEFAULT_EDIT_STATE = {}

const DEFAULT_STATE = {
  shippingMethods: {}
}

const SHIPPING_METHOD_DEFAULT_STATE = {
  systemName: null,
  label: {},
  group: {},
  totalMode: RULES_TOTAL_SET_MAX_INCREASE_VALUE,
  productIncreaseStrategy: PRODUCT_INCREASE_STRATEGY_MAX,
  costIncreaseMode: COST_INCREASE_MODE_SUM,
  disableOnZero: false,
  geozone: null,
  baseCost: 0,
  rulesets: {},
};

const DEFAULT_RULESET = {
  label: {},
  useLabel: false,
  once: true,
  increase: 0,
  rules: [],
};

/*

  State:
  {
    [id]: SHIPPING_METHOD_DEFAULT_STATE
  }

*/
const makeId = () => Date.now().toString()

function AppStateProvider({ state: defaultState = {}, children }) {
  const [result, setResult] = useState(
    merge({}, DEFAULT_STATE, defaultState)
  )

  const [currentShippingMethodId, setCurrentShippingMethodId] = useState(null)

  const setState = (id, nextState) => {
    console.log(id, nextState)
    setResult(result => ({
      ...result,
      shippingMethods: {
        ...result.shippingMethods,
        [id]: nextState
      }
    }))
  }

  const state = useMemo(() => result.shippingMethods?.[currentShippingMethodId] ?? DEFAULT_EDIT_STATE, [result, currentShippingMethodId])

  const addNewShippingMethod = () => {
    const nextId = makeId()
    const nextState = Object.assign({}, SHIPPING_METHOD_DEFAULT_STATE, { systemName: nextId })

    // Set new as current
    setCurrentShippingMethodId(nextId)
    setState(nextId, nextState)

    return nextId
  }

  const removeShippingMethod = (id) => {
    // setState...
    setResult(state => {
      const { [id]: _, ...shippingMethods } = state.shippingMethods

      return {
        ...state,
        shippingMethods
      }
    })

    if (id === currentShippingMethodId) {
      setCurrentShippingMethodId(null)
    }

    return id
  }

  const getRuleset = (id) => state.rulesets[id];

  const setRulesets = (rulesets) => {
    setState(currentShippingMethodId, {
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
    setState(currentShippingMethodId, {
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
      setState(currentShippingMethodId, {
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
      setState(currentShippingMethodId, {
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
      setState(currentShippingMethodId, {
        ...state,
        costIncreaseMode,
      });
    }
  };

  const setLabel = (label = "") => {
    setState(currentShippingMethodId, { ...state, label })
  }

  const setGroup = (group = "") => {
    setState(currentShippingMethodId, { ...state, group })
  }

  const setDisableOnZero = (nextDisableOnZero) => {
    setState(currentShippingMethodId, { ...state, disableOnZero: !!nextDisableOnZero})
  }

  const setGeoZone = (geozone = null) => {
    setState(currentShippingMethodId, { ...state, geozone })
  }

  const setBaseCost = (baseCost = 0) => {
    setState(currentShippingMethodId, { ...state, baseCost })
  }

  const setSystemName = (systemName = "") => {
    setState(currentShippingMethodId, { ...state, systemName })
  }

  const value = {
    get state() {
      return state;
    },
    get shippingMethods() {
      return result.shippingMethods
    },
    get exportableResult () {
      return result
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
    get currentShippingMethod () {
      return state
    },
    currentShippingMethodId,
    setCurrentShippingMethodId,
    get baseCost () {
      return state.baseCost
    },
    get systemName() {
      return state.systemName
    },
    setBaseCost,
    setGeoZone,
    setDisableOnZero,
    setRulesets,
    setLabel,
    setGroup,
    setTotalMode,
    setCostIncreaseMode,
    setProductIncreaseStrategy,
    setSystemName,
    getRuleset,
    updateRuleset,
    addNewRuleset,
    deleteRuleset,
    addNewRule,
    deleteRule,
    updateRule,
    addNewShippingMethod,
    removeShippingMethod,
    resetAppState(newState) {
      setState(DEFAULT_EDIT_STATE)
      setResult(newState)
    },
  };

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
}

const AppStateConsumer = AppStateContext.Consumer;

const useAppState = () => useContext(AppStateContext);

export {
  AppStateContext,
  AppStateProvider,
  AppStateConsumer,
  useAppState,
};
