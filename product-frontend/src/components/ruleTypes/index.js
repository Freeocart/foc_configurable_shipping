import Language from "./Language";
import Currency from "./Currency";
import Countries from "./Countries";
import Geozone from "./Geozone";

export const RULE_TYPES = {
  language: {
    name: "Language",
    component: Language,
  },
  currency: {
    name: "Currency",
    component: Currency,
  },
  countries: {
    name: "Countries",
    component: Countries,
  },
  geozones: {
    name: "Geozone",
    component: Geozone,
  },
};

export function getRuleTypeComponent(type) {
  const ruleType = getRuleType(type);
  if (ruleType) {
    return ruleType.component;
  }
  return null;
}

export function getRuleType(type) {
  if (RULE_TYPES[type]) {
    return RULE_TYPES[type];
  }

  return null;
}
