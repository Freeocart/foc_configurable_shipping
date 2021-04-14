import React, { useState, useCallback } from "react";
import { useAppSettings } from "../../lib/AppSettings";
import { useI18n } from "react-simple-i18n";

import { OPTION_VALUE_NOT_SELECTED } from "common/constants";

export default function Geozone({ value: propValue, onChange }) {
  const [rule, setRule] = useState(propValue ?? null);
  const { geoZones = [] } = useAppSettings();

  const { t } = useI18n();

  const onLanguageChange = useCallback(
    (e) => {
      const newRule = {
        ...rule,
        zone_id: e.target.value,
      };

      setRule(newRule);
      onChange(newRule);
    },
    [onChange, rule]
  );

  return (
    <div className="Language">
      <div className="form-horizontal">
        <label className="col-sm-2">{t("If customer geozone is")}</label>
        <div className="col-sm-10">
          <label>{t("Geozone")}</label>
          <select
            className="form-control"
            value={rule.zone_id}
            onChange={onLanguageChange}
          >
            <option value={OPTION_VALUE_NOT_SELECTED}>
              {t("Not selected")}
            </option>
            {geoZones.map((zone) => (
              <option key={zone.geo_zone_id} value={zone.geo_zone_id}>
                {zone.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
