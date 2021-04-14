import Language from "./Language";
import Currency from "./Currency";
import Countries from "./Countries";
import Geozone from "./Geozone";
import Option from "./Option";
import Attribute from "./Attribute";

import './Rule.css';

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
  option: {
    name: "Option",
    component: Option,
  },
  attribute: {
    name: "Attribute",
    component: Attribute,
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
