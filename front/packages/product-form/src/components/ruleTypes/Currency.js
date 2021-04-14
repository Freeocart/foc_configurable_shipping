import React, { useState, useCallback } from "react";
import { useAppSettings } from "../../lib/AppSettings";
import { useI18n } from "react-simple-i18n";

import { OPTION_VALUE_NOT_SELECTED } from "common/constants";

export default function Currency({ value: propValue, onChange }) {
  const [rule, setRule] = useState(propValue);
  const { currencies } = useAppSettings();

  const { t } = useI18n();

  const onCurrencyChange = useCallback(
    (e) => {
      const newRule = {
        ...rule,
        currency_id: e.target.value,
      };

      setRule(newRule);
      onChange?.(newRule);
    },
    [onChange, rule]
  );

  return (
    <div className="Language">
      <div className="form-horizontal">
        <label>{t("If customer currency is")}</label>

        <select
          className="form-control"
          value={rule.currency_id}
          onChange={onCurrencyChange}
        >
          <option value={OPTION_VALUE_NOT_SELECTED}>{t("Not selected")}</option>
          {currencies.map((currency) => (
            <option key={currency.currency_id} value={currency.currency_id}>
              {currency.title}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
