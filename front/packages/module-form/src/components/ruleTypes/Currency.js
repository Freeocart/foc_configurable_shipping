import React, { useState, useCallback } from "react";
import { useAppSettings } from "../../lib/AppSettings";
import { useI18n } from "react-simple-i18n";

import { OPTION_VALUE_NOT_SELECTED } from "common/constants";

import "./Currency.css";

export default function Currency({ rulesetId, rule: propRule }) {
  const [rule, setRule] = useState(propRule);
  const { currencies, updateRule } = useAppSettings();

  const { t } = useI18n();

  const onCurrencyChange = useCallback(
    (e) => {
      const newRule = {
        ...rule,
        currency_id: e.target.value,
      };

      setRule(newRule);
      updateRule(rulesetId, propRule, {
        ...rule,
        ...newRule,
      });
    },
    [propRule, rule, rulesetId, updateRule]
  );

  return (
    <div className="Currency">
      <div className="form-horizontal Rule__form">
        <label className="col-sm-2">{t("If customer currency is")}</label>
        <div className="col-sm-10">
          <select
            className="form-control"
            value={rule.currency_id}
            onChange={onCurrencyChange}
          >
            <option value={OPTION_VALUE_NOT_SELECTED}>
              {t("Not selected")}
            </option>
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
