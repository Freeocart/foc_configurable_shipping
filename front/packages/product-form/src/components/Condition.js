import { useCallback } from "react";
import { useI18n } from "react-simple-i18n";

import ConditionLabel from './ConditionLabel';
import RulePicker from "./RulePicker";

import { RULE_TYPES } from "./ruleTypes";

import './Condition.css'

export default function Condition({
  value = {},
  onChange,
  onDelete,
  showDeleteBtn = false,
}) {
  const { t } = useI18n();
  const { type } = value;

  const handleConditionTypeChange = useCallback(
    (e) => {
      onChange?.({ type: e.target.value });
    },
    [onChange]
  );

  const handleConditionValueChange = useCallback(
    (newValue) => {
      onChange?.(newValue);
    },
    [onChange]
  );

  const handleDeleteConditionClick = useCallback(() => {
    onDelete?.();
  }, [onDelete]);

  return (<>
    <ConditionLabel className="ConditionLabel--left" label={t("If")} />
    <div className="Condition row">

      <div className="col-md-3">
        <label>{t('Rule type')}</label>
        <select
          className="form-control"
          value={type}
          onChange={handleConditionTypeChange}
        >
          {Object.entries(RULE_TYPES).map(([key, ruleType]) => (
            <option key={key} value={key}>
              {t(ruleType.name)}
            </option>
          ))}
        </select>
      </div>
      <div className="col-md-1 text-center">
        <ConditionLabel label="=" />
      </div>
      <div className={`${showDeleteBtn ? "col-md-6" : "col-md-8"}`}>
        <RulePicker
          value={value}
          type={type}
          onChange={handleConditionValueChange}
        />
      </div>
      {showDeleteBtn && (
        <div className="col-md-2">
          <button
            className="btn btn-xs btn-danger"
            type="button"
            onClick={handleDeleteConditionClick}
          >
            <i className="fa fa-trash"></i>&nbsp;
            <span>
              {t("Delete condition")}
            </span>
          </button>
        </div>
      )}
    </div>
    </>
  );
}
