import React, { useState, useCallback } from "react";
import { useAppSettings } from "../../lib/AppSettings";
import { useI18n } from "react-simple-i18n";

import { OPTION_VALUE_NOT_SELECTED } from 'common/constants';

export default function Language({ rulesetId, rule: propRule }) {
  const [rule, setRule] = useState(propRule);
  const { languages, updateRule } = useAppSettings();

  const { t } = useI18n();

  const onLanguageChange = useCallback(
    (e) => {
      const newRule = {
        ...rule,
        language_id: e.target.value,
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
    <div className="Language">
      <div className="form-horizontal">
        <label className="col-sm-2">{t("If customer language is")}</label>
        <div className="col-sm-10">
          <select
            className="form-control"
            value={rule.language_id}
            onChange={onLanguageChange}
          >
            <option value={OPTION_VALUE_NOT_SELECTED}>
              {t("Not selected")}
            </option>
            {languages.map((language) => (
              <option key={language.language_id} value={language.language_id}>
                {language.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
