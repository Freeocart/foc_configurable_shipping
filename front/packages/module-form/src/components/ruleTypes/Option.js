import React, { useState, useCallback, useMemo } from "react";
import { useAppSettings } from "../../lib/AppSettings";
import { useI18n } from "react-simple-i18n";
import { intOrNull } from "common/functions";

import {
  OPTION_VALUE_IS_ANY,
  OPTION_VALUE_NOT_SELECTED,
} from "common/constants";

export default function Option({ rulesetId, rule }) {
  const [selectedOptionId, setSelectedOptionId] = useState(
    intOrNull(rule.option_id)
  );
  const [selectedOptionValueId, setSelectedOptionValueId] = useState(
    intOrNull(rule.option_value_id)
  );
  const { options, optionsValues, updateRule } = useAppSettings();
  const { t } = useI18n();

  const filteredOptionValues = useMemo(() => {
    return optionsValues.filter(
      (optionValue) =>
        parseInt(optionValue.option_id) === parseInt(selectedOptionId)
    );
  }, [selectedOptionId, optionsValues]);

  const handleSelectOptionId = useCallback(
    (e) => {
      setSelectedOptionId(e.target.value);
      updateRule(rulesetId, rule, {
        option_id: e.target.value,
        option_value_id: null,
      });
    },
    [rule, rulesetId, updateRule]
  );

  const handleSelectOptionValueId = useCallback(
    (e) => {
      setSelectedOptionValueId(e.target.value);
      updateRule(rulesetId, rule, { option_value_id: e.target.value });
    },
    [rule, rulesetId, updateRule]
  );

  return (
    <div className="form-horizontal">
      <div className="col-sm-12">
        <label>{t("If cart product have option")}</label>
      </div>
      <div className="col-sm-6">
        <select
          className="form-control"
          value={selectedOptionId}
          onChange={handleSelectOptionId}
        >
          <option value={null}>{t("Not selected")}</option>
          {options.map((option) => (
            <option value={option.option_id}>{option.name}</option>
          ))}
        </select>
      </div>
      <div className="col-sm-6">
        <select
          className="form-control"
          value={selectedOptionValueId}
          onChange={handleSelectOptionValueId}
        >
          <option value={OPTION_VALUE_NOT_SELECTED}>{t("Not selected")}</option>
          <option value={OPTION_VALUE_IS_ANY}>{t("Any option value")}</option>
          {filteredOptionValues.map((optionValue) => (
            <option value={optionValue.option_value_id}>
              {optionValue.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
