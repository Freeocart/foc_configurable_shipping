import React, { useState, useCallback } from "react";
import { useI18n } from "react-simple-i18n";
import { useAppSettings } from "../../lib/AppSettings";
import { useAppState } from "../../lib/AppState";
import { intOrNull } from "common/functions";

import { OPTION_VALUE_NOT_SELECTED } from "common/constants";

import "./Category.css";

export default function Attribute({ rulesetId, rule }) {
  const [categoryId, setCategoryId] = useState(intOrNull(rule.category_id));

  const [checkChildCategories, setCheckChildCategories] = useState(
    !!rule.category_check_childs
  );

  const { categories } = useAppSettings();
  const { updateRule } = useAppState();

  const { t } = useI18n();

  const handleSelectCategory = useCallback(
    (e) => {
      updateRule(rulesetId, rule, {
        category_id: e.target.value,
        category_check_childs: false,
      });
      setCategoryId(e.target.value);
    },
    [rule, rulesetId, updateRule]
  );

  const handleChangeCheckChilds = useCallback(
    (e) => {
      updateRule(rulesetId, rule, {
        category_check_childs: e.target.checked,
      });
      setCheckChildCategories(e.target.checked);
    },
    [rule, rulesetId, updateRule]
  );

  return (
    <div className="Category">
      <div className="form-horizontal Rule__form">
        <div className="col-sm-4 text-left">
          <label>{t("If cart product have category")}</label>
        </div>
        <div className="col-sm-4">
          <select
            className="form-control"
            value={categoryId}
            onChange={handleSelectCategory}
          >
            <option value={OPTION_VALUE_NOT_SELECTED}>
              {t("Not selected")}
            </option>
            {categories.map((category) => (
              <option value={category.category_id}>{category.name}</option>
            ))}
          </select>
        </div>

        <div className="col-sm-4">
          <label className="checkbox">
            <input
              type="checkbox"
              checked={checkChildCategories}
              onChange={handleChangeCheckChilds}
            />
            <span>{t("Also check child categories?")}</span>
          </label>
        </div>
      </div>
    </div>
  );
}
