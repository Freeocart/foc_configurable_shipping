import React, { useState } from "react";
import { useAppSettings } from "../../lib/AppSettingsProvider";
import { useI18n } from "react-simple-i18n";

export default function Language({ rulesetId, value: propValue, onChange }) {
  const [rule, setRule] = useState(propValue);
  const { languages } = useAppSettings();

  const { t } = useI18n();

  const onLanguageChange = (e) => {
    const newRule = {
      ...rule,
      language_id: e.target.value,
    };

    setRule(newRule);
    onChange?.(newRule);
  };

  return (
    <div className="Language">
      <div className="form-horizontal">
        <label className="col-sm-2">{t("If customer language is")}</label>
        <div className="col-sm-10">
          <select
            className="form-control"
            value={rule.language_id}
            onChange={onLanguageChange}
          >
            <option value="-1">Не выбран</option>
            {languages.map((language) => (
              <option key={language.id} value={language.id}>
                {language.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
