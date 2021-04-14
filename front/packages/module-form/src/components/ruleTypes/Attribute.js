import React, { useState, useCallback, useMemo } from "react";
import { useI18n } from "react-simple-i18n";
import { useAppSettings } from "../../lib/AppSettings";
import { intOrNull } from "common/functions";

import { OPTION_VALUE_NOT_SELECTED } from 'common/constants';

export default function Attribute({ rulesetId, rule }) {
  const [attributeGroupId, setAttributeGroupId] = useState(
    intOrNull(rule.attribute_group_id)
  );
  const [attributeId, setAttributeId] = useState(intOrNull(rule.attribute_id));
  const [attributeValue, setAttributeValue] = useState(intOrNull(rule.attribute_value));
  const [checkAttributeValue, setCheckAttributeValue] = useState(!!rule.attribute_check_value);
  const { attributeGroups, attributes, updateRule } = useAppSettings();
  const { t } = useI18n();

  const handleSelectAttributeGroup = useCallback(
    (e) => {
      updateRule(rulesetId, rule, {
        attribute_group_id: e.target.value,
        attribute_id: null,
        attribute_value: null,
        attribute_check_value: false,
      });
      setAttributeGroupId(e.target.value);
    },
    [rule, rulesetId, updateRule]
  );

  const handleSelectAttribute = useCallback(
    (e) => {
      updateRule(rulesetId, rule, {
        attribute_id: e.target.value,
      });
      setAttributeId(e.target.value);
    },
    [rule, rulesetId, updateRule]
  );

  const handleChangeAttributeValue = useCallback(
    (e) => {
      updateRule(rulesetId, rule, {
        attribute_value: e.target.value,
      });
      setAttributeValue(e.target.value);
    },
    [rule, rulesetId, updateRule]
  );

  const handleChangeCheckAttributeValue = useCallback(
    (e) => {
      updateRule(rulesetId, rule, {
        attribute_check_value: e.target.checked,
      });
      setCheckAttributeValue(e.target.checked);
    },
    [rule, rulesetId, updateRule]
  );

  const filteredAttributes = useMemo(
    () =>
      attributes.filter(
        (attribute) =>
          parseInt(attribute.attribute_group_id) === parseInt(attributeGroupId)
      ),
    [attributeGroupId, attributes]
  );

  return (
    <div className="form-horizontal">
      <div className="col-sm-4">
        <span>{t("Attribute group")}</span>
        <select
          className="form-control"
          value={attributeGroupId}
          onChange={handleSelectAttributeGroup}
        >
          <option value={OPTION_VALUE_NOT_SELECTED}>
            {t("Not selected")}
          </option>
          {attributeGroups.map((attributeGroup) => (
            <option value={attributeGroup.attribute_group_id}>
              {attributeGroup.name}
            </option>
          ))}
        </select>
      </div>
      <div className="col-sm-4">
        <span>{t("Attribute")}</span>
        <select
          className="form-control"
          value={attributeId}
          onChange={handleSelectAttribute}
        >
          <option value={OPTION_VALUE_NOT_SELECTED}>
            {t("Not selected")}
          </option>
          {filteredAttributes.map((attribute) => (
            <option value={attribute.attribute_id}>{attribute.name}</option>
          ))}
        </select>
      </div>
      <div className="col-sm-4">
        <input
          type="text"
          placeholder={t("Attribute value")}
          value={attributeValue}
          onChange={handleChangeAttributeValue}
          className="form-control"
        />

        <label className="checkbox">
          {t("Check attribute value?")}
          <input
            type="checkbox"
            checked={checkAttributeValue}
            onChange={handleChangeCheckAttributeValue}
          />
        </label>
      </div>
    </div>
  );
}
