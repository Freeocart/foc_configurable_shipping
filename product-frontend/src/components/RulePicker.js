import React from "react";
// import Language from './ruleTypes/Language'
// import Option from './ruleTypes/Option'
import { getRuleTypeComponent } from "./ruleTypes";
// import { useAppSettings } from "../lib/AppSettingsProvider";

import "./ruleTypes/Rule.css";

function RulePicker({ indexes, type, value, onChange }) {
  const RuleComponent = getRuleTypeComponent(type);

  if (RuleComponent) {
    return (
      <div className="Rule form-horizontal">
        <div className="form-group">
          <RuleComponent indexes={indexes} value={value} onChange={onChange} />
        </div>
      </div>
    );
  } else {
    return <>No rule parser for {type}</>;
  }
}

export default RulePicker;
