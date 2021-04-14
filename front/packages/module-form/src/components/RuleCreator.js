import React, { useState, useCallback } from "react";
import { useAppSettings } from "../lib/AppSettings";
import { useI18n } from "react-simple-i18n";

import { RULE_TYPES } from "./ruleTypes";

import "./RuleCreator.css";

export default function RuleCreator({ rulesetId }) {
  const [selectedType, setSelectedType] = useState(Object.keys(RULE_TYPES)[0]);
  const { addNewRule } = useAppSettings();

  const { t } = useI18n();

  const handleRuleTypeChange = useCallback((e) => {
    setSelectedType(e.target.value);
  }, []);

  const handleRuleTypeCreateClick = useCallback(
    (e) => {
      e.preventDefault();
      addNewRule(rulesetId, selectedType);
    },
    [addNewRule, rulesetId, selectedType]
  );

  return (
    <div className="RuleCreator">
      <h5>{t("Add new rule")}</h5>

      <div className="input-group">
        <select
          className="form-control"
          onChange={handleRuleTypeChange}
          value={selectedType}
        >
          {Object.entries(RULE_TYPES).map(([key, ruleType]) => (
            <option key={key} value={key}>
              {t(ruleType.name)}
            </option>
          ))}
        </select>
        <div className="input-group-btn">
          <button
            className="btn btn-primary"
            onClick={handleRuleTypeCreateClick}
          >
            <i className="fa fa-plus"></i>&nbsp;
            <span>
              {t("Add")}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
