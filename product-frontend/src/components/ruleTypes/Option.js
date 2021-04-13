import React, { useState, useCallback, useMemo } from "react";
import { useI18n } from "react-simple-i18n";
import { useAppSettings } from "../../lib/AppSettingsProvider";
import { intOrNull } from "../../lib/helpers";

import { OPTION_VALUE_IS_ANY } from "../../config/constants";

export default function Option({ rule, onChange }) {
  const [selectedOptionId, setSelectedOptionId] = useState(
    intOrNull(rule.option_id)
  );
  const [selectedOptionValueId, setSelectedOptionValueId] = useState(
    intOrNull(rule.value)
  );
  const { options, optionsValues } = useAppSettings();
  const { t } = useI18n();

  const filteredOptionValues = useMemo(() => {
    return optionsValues.filter(
      (optionValue) =>
        parseInt(optionValue.option_id) === parseInt(selectedOptionId)
    );
  }, [selectedOptionId, optionsValues]);

  const handleSelectOptionId = useCallback((e) => {
    setSelectedOptionId(e.target.value);
  }, []);

  const handleSelectOptionValueId = useCallback(
    (e) => {
      setSelectedOptionValueId(e.target.value);

      const newRule = {
        ...rule,
        option_id: selectedOptionId,
        value: selectedOptionValueId,
      };
      onChange?.(newRule);
    },
    [onChange, rule, selectedOptionId, selectedOptionValueId]
  );

  return (
    <div className="form-horizontal">
      <div className="col-sm-6">
        <select
          className="form-control"
          value={selectedOptionId}
          onChange={handleSelectOptionId}
        >
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
          <option value={null}>{t("Not selected")}</option>
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
