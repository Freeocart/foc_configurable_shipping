import React, { useState, useCallback, useMemo } from "react";
import { useI18n } from "react-simple-i18n";
import { useAppSettings } from "../../lib/AppSettings";
import { intOrNull } from "../../lib";

export default function Attribute({ rulesetId, rule }) {
  const [attributeGroupId, setAttributeGroupId] = useState(
    intOrNull(rule.attribute_group_id)
  );
  const [attributeId, setAttributeId] = useState(intOrNull(rule.attribute_id));
  const [attributeValue, setAttributeValue] = useState(rule.value);
  const [checkAttributeValue, setCheckAttributeValue] = useState(
    rule.check_value
  );
  const { attributeGroups, attributes, updateRule } = useAppSettings();
  const { t } = useI18n();

  const handleSelectAttributeGroup = useCallback(
    (e) => {
      setAttributeGroupId(e.target.value);
      updateRule(rulesetId, rule, {
        attribute_group_id: e.target.value,
        attribute_id: null,
        value: null,
        check_value: false,
      });
    },
    [rule, rulesetId, updateRule]
  );

  const handleSelectAttribute = useCallback(
    (e) => {
      setAttributeId(e.target.value);
      updateRule(rulesetId, rule, {
        attribute_id: e.target.value,
      });
    },
    [rule, rulesetId, updateRule]
  );

  const handleChangeAttributeValue = useCallback(
    (e) => {
      setAttributeValue(e.target.value);
      updateRule(rulesetId, rule, {
        value: e.target.value,
      });
    },
    [rule, rulesetId, updateRule]
  );

  const handleChangeCheckAttributeValue = useCallback(
    (e) => {
      setCheckAttributeValue(e.target.checked);
      updateRule(rulesetId, rule, {
        check_value: e.target.checked,
      });
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
          <option value={null}>{t("Not selected")}</option>
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
          <option value={null}>{t("Not selected")}</option>
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
