import React, { useMemo, useCallback } from "react";
import { useI18n } from "react-simple-i18n";
import { useAppState } from "../lib/AppState";
import { getRuleTypeComponent } from "./ruleTypes";

import "./ruleTypes/Rule.css";

function RulePicker({ rulesetId, rule }) {
  const { deleteRule } = useAppState();
  const { t } = useI18n();

  const RuleComponent = useMemo(() => getRuleTypeComponent(rule.type), [
    rule.type,
  ]);

  const handleDeleteRuleClick = useCallback(
    (e) => {
      e.preventDefault();
      deleteRule(rulesetId, rule);
    },
    [deleteRule, rule, rulesetId]
  );

  if (RuleComponent) {
    return (
      <div className={`Rule form-horizontal Rule--${rule.type}`}>
        <button
          className="btn btn-danger Rule__RemoveBtn"
          type="button"
          onClick={handleDeleteRuleClick}
        >
          <i className="fa fa-trash"></i>
        </button>

        <div className="form-group">
          <RuleComponent rulesetId={rulesetId} rule={rule} />
        </div>
      </div>
    );
  } else {
    return <>No rule parser for {rule.type}</>;
  }
}

export default RulePicker;
