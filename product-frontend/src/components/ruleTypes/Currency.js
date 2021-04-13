import React, { useState } from "react";
import { useAppSettings } from "../../lib/AppSettingsProvider";
import { useI18n } from "react-simple-i18n";

export default function Currency({ value: propValue, onChange }) {
  const [rule, setRule] = useState(propValue);
  const { currencies } = useAppSettings();

  const { t } = useI18n();

  const onCurrencyChange = (e) => {
    const newRule = {
      ...rule,
      currency_id: e.target.value,
    };

    setRule(newRule);
    onChange?.(newRule);
  };

  return (
    <div className="Language">
      <div className="form-horizontal">
        <label className="col-sm-2">{t("If selected currency")}</label>
        <div className="col-sm-10">
          <select
            className="form-control"
            value={rule.currency_id}
            onChange={onCurrencyChange}
          >
            <option value="-1">Не выбрано</option>
            {currencies.map((currency) => (
              <option key={currency.currency_id} value={currency.currency_id}>
                {currency.title}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
