import { useCallback } from "react";
import { useI18n } from "react-simple-i18n";
import { useAppSettings } from "../lib/AppSettings";

import ConditionLabel from './ConditionLabel';

import {
  RULESET_RESOLVER_SET_POSITION_VALUE,
  RULESET_RESOLVER_SET_POSITION_ITEM_VALUE,
  RULESET_RESOLVER_ADD_POSITION_VALUE,
  RULESET_RESOLVER_ADD_POSITION_ITEM_VALUE,
} from "../config/constants";

import './RulesetResolver.css';

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
      <ConditionLabel className="ConditionLabel--block" label={t('Then')} />

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

      <ConditionLabel className="col-md-2" label="=" />

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
