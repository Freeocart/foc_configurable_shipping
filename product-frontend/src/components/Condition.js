import { useCallback } from "react";
import { useI18n } from "react-simple-i18n";

import RulePicker from "./RulePicker";

export default function Condition({
  value: { type, value } = {},
  onChange,
  onDelete,
  showDeleteBtn = false,
}) {
  const { t } = useI18n();

  const handleConditionTypeChange = useCallback(
    (e) => {
      onChange?.({ type: e.target.value });
    },
    [onChange]
  );

  const handleConditionValueChange = useCallback(
    (value) => {
      onChange?.({ ...value });
    },
    [onChange]
  );

  const handleDeleteConditionClick = useCallback(
    (e) => {
      onDelete?.();
    },
    [onDelete]
  );

  return (
    <div className="Condition row">
      <div className="col-md-12">
        <label>{t("If")}</label>
      </div>
      <div className="col-md-3">
        <select
          className="form-control"
          value={type}
          onChange={handleConditionTypeChange}
        >
          <option value="language">язык покупателя</option>
          <option value="currency">валюта покупателя</option>
          <option value="geozones">геозона доставки</option>
          <option value="countries">страна доставки</option>
        </select>
      </div>
      <div className="col-md-1 text-center">
        <span>=</span>
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
            {t("Delete condition")}
          </button>
        </div>
      )}
    </div>
  );
}
