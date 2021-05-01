import React from "react";
import { useI18n } from "react-simple-i18n";

import "./RuleDelimiter.css";

export default function RuleDelimiter() {
  const { t } = useI18n();

  return (
    <div className="RuleDelimiter">
      <label>
        {t("And")} {t("If")}
      </label>
    </div>
  );
}
