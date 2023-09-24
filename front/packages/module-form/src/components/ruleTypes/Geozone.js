import React, { useState, useCallback } from "react";
import { useAppSettings } from "../../lib/AppSettings";
import { useAppState } from "../../lib/AppState";
import { useI18n } from "react-simple-i18n";

import { OPTION_VALUE_NOT_SELECTED } from "common/constants";

import "./Geozone.css";

export default function Geozone({ rulesetId, rule: propRule }) {
  const [rule, setRule] = useState(propRule);
  const { geoZones = [] } = useAppSettings();
  const { updateRule } = useAppState();

  const { t } = useI18n();

  const onGeozoneChange = useCallback(
    (e) => {
      const newRule = {
        ...rule,
        zone_id: e.target.value,
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
    <div className="Geozone">
      <div className="form-horizontal Rule__form">
        <label className="col-sm-2">{t("If customer geozone is")}</label>
        <div className="col-sm-10">
          <select
            className="form-control"
            value={rule.zone_id}
            onChange={onGeozoneChange}
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
