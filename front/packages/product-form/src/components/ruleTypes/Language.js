import React, { useState, useCallback } from "react";
import { useAppSettings } from "../../lib/AppSettings";
import { useI18n } from "react-simple-i18n";

import { OPTION_VALUE_NOT_SELECTED } from "common/constants";

export default function Language({ value: propValue, onChange }) {
  const [rule, setRule] = useState(propValue);
  const { languages } = useAppSettings();

  const { t } = useI18n();

  const onLanguageChange = useCallback(
    (e) => {
      const newRule = {
        ...rule,
        language_id: e.target.value,
      };

      setRule(newRule);
      onChange?.(newRule);
    },
    [onChange, rule]
  );

  return (
    <div className="Language">
      <div className="form-horizontal">
        <label>{t("If customer language is")}</label>

        <select
          className="form-control"
          value={rule.language_id}
          onChange={onLanguageChange}
        >
          <option value={OPTION_VALUE_NOT_SELECTED}>{t("Not selected")}</option>
          {languages.map((language) => (
            <option key={language.language_id} value={language.language_id}>
              {language.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
