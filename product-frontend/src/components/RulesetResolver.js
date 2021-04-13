import { useCallback } from "react";
import { useI18n } from "react-simple-i18n";
import { useAppSettings } from "../lib/AppSettingsProvider";

import {
  RULESET_RESOLVER_SET_POSITION_VALUE,
  RULESET_RESOLVER_SET_POSITION_ITEM_VALUE,
  RULESET_RESOLVER_ADD_POSITION_VALUE,
  RULESET_RESOLVER_ADD_POSITION_ITEM_VALUE,
} from "../config/constants";

export default function RulesetResolver({
  value: { value, type } = {},
  onChange,
}) {
  const { t } = useI18n();
  const { currencySymbol } = useAppSettings();

  const handleValueChange = useCallback(
    (e) => {
      onChange?.({ value: e.target.value });
    },
    [onChange]
  );

  const handleTypeChange = useCallback(
    (e) => {
      onChange?.({ type: e.target.value });
    },
    [onChange]
  );

  return (
    <div className="row RulesetResolver">
      <div className="col-md-12">
        <label>{t("Then")}</label>
      </div>
      <div className="col-md-5">
        <select
          value={type}
          onChange={handleTypeChange}
          className="form-control"
        >
          <option value={RULESET_RESOLVER_SET_POSITION_VALUE}>
            {t(
              "Set as shipping total for position (skip other increases for position)"
            )}
          </option>
          <option value={RULESET_RESOLVER_SET_POSITION_ITEM_VALUE}>
            {t(
              "Set as shipping total for position (multiply on products quantity)"
            )}
          </option>
          <option value={RULESET_RESOLVER_ADD_POSITION_VALUE}>
            {t(
              "Add to shipping total (do not skip other increases for position)"
            )}
          </option>
          <option value={RULESET_RESOLVER_ADD_POSITION_ITEM_VALUE}>
            {t("Add to shipping total (multiply on products quantity)")}
          </option>
        </select>
      </div>
      <div className="col-md-2 text-center">
        <span>=</span>
      </div>
      <div className="col-md-5">
        <input
          className="form-control"
          type="text"
          placeholder={`${t("Increase value")} (${currencySymbol})`}
          value={value}
          onChange={handleValueChange}
        />
      </div>
    </div>
  );
}
