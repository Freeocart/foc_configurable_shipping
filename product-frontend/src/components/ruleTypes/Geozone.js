import React, { useState } from "react";
import { useAppSettings } from "../../lib/AppSettingsProvider";
import { useI18n } from "react-simple-i18n";

export default function Geozone({ rulesetId, value: propValue, onChange }) {
  const [rule, setRule] = useState(propValue ?? null);
  const { geoZones = [] } = useAppSettings();

  const { t } = useI18n();

  const onLanguageChange = (e) => {
    const newRule = {
      ...rule,
      zone_id: e.target.value,
    };

    setRule(newRule);
    onChange(newRule);
  };

  return (
    <div className="Language">
      <div className="form-horizontal">
        <label className="col-sm-2">{t("If customer geozone is")}</label>
        <div className="col-sm-10">
          <select
            className="form-control"
            value={rule.zone_id}
            onChange={onLanguageChange}
          >
            <option value="-1">Не выбран</option>
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
