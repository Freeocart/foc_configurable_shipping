import React, { useState, useCallback, useMemo } from "react";
import { useI18n } from "react-simple-i18n";
import { useAppSettings } from "../../lib/AppSettings";
import { intOrNull } from "common/functions";

import {
  OPTION_VALUE_NOT_SELECTED,
  OPTION_VALUE_IS_ANY,
} from "common/constants";

export default function Option({ value: propValue = {}, onChange }) {
  const [selectedOptionId, setSelectedOptionId] = useState(
    intOrNull(propValue.option_id)
  );
  const [selectedOptionValueId, setSelectedOptionValueId] = useState(
    intOrNull(propValue.option_value_id)
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
    const newRule = {
      ...propValue,
      option_value_id: OPTION_VALUE_NOT_SELECTED,
      option_id: e.target.value,
    };
    setSelectedOptionId(e.target.value);
    setSelectedOptionValueId(OPTION_VALUE_NOT_SELECTED);
    onChange?.(newRule);
  }, []);

  const handleSelectOptionValueId = useCallback(
    (e) => {
      const newRule = {
        ...propValue,
        option_id: selectedOptionId,
        option_value_id: e.target.value,
      };

      setSelectedOptionValueId(e.target.value);
      onChange?.(newRule);
    },
    [onChange, propValue, selectedOptionId]
  );

  return (
    <div className="form-horizontal">
      <div className="col-sm-6">
        <label>{t("Option")}</label>
        <select
          className="form-control"
          value={selectedOptionId}
          onChange={handleSelectOptionId}
        >
          <option value={OPTION_VALUE_NOT_SELECTED}>{t("Not selected")}</option>
          {options.map((option) => (
            <option value={option.option_id}>{option.name}</option>
          ))}
        </select>
      </div>
      <div className="col-sm-6">
        <label>{t("Option value")}</label>
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
