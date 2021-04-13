import React, { useMemo } from "react";
import { getRuleTypeComponent } from "./ruleTypes";

import "./ruleTypes/Rule.css";

function RulePicker({ type, value, onChange }) {
  const RuleComponent = useMemo(() => getRuleTypeComponent(type), [type]);

  if (RuleComponent) {
    return (
      <div className="Rule form-horizontal">
        <div className="form-group">
          <RuleComponent value={value} onChange={onChange} />
        </div>
      </div>
    );
  } else {
    return <>No rule parser for {type}</>;
  }
}

export default RulePicker;
