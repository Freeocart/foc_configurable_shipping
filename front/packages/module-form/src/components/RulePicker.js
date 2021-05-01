import React, { useMemo, useCallback } from "react";
import { useI18n } from "react-simple-i18n";
import { useAppSettings } from "../lib/AppSettings";
import { getRuleTypeComponent } from "./ruleTypes";

import "./ruleTypes/Rule.css";

function RulePicker({ rulesetId, rule }) {
  const { deleteRule } = useAppSettings();
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
      <div className="Rule form-horizontal">
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
        {/* <div className="form-group">
          <button className="btn btn-danger" onClick={handleDeleteRuleClick}>
            <i className="fa fa-trash"></i>&nbsp;
            <span>
              {t("Delete rule")}
            </span>
          </button>
        </div> */}
      </div>
    );
  } else {
    return <>No rule parser for {rule.type}</>;
  }
}

export default RulePicker;
