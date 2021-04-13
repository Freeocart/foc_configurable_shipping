import React, { useState, useMemo, useCallback } from "react";
import { useAppSettings } from "../../lib/AppSettingsProvider";
import { useI18n } from "react-simple-i18n";
import { intOrNull } from "../../lib/helpers";

const DEFAULT_STATE = {
  attribute_group_id: null,
  attribute_id: null,
  value: null,
  check_value: false,
};

export default function Attribute({ rule, onChange }) {
  const [attributeGroupId, setAttributeGroupId] = useState(
    intOrNull(rule.attribute_group_id)
  );
  const [attributeId, setAttributeId] = useState(intOrNull(rule.attribute_id));
  const [attributeValue, setAttributeValue] = useState(rule.value);
  const [checkAttributeValue, setCheckAttributeValue] = useState(
    rule.check_value
  );
  const { attributeGroups, attributes } = useAppSettings();
  const { t } = useI18n();

  const handleSelectAttributeGroup = useCallback(
    (e) => {
      setAttributeGroupId(e.target.value);
      onChange?.({
        ...DEFAULT_STATE,
        ...rule,
        attribute_group_id: e.target.value,
      });
    },
    [onChange, rule]
  );

  const handleSelectAttribute = useCallback(
    (e) => {
      setAttributeId(e.target.value);
      onChange?.({
        ...DEFAULT_STATE,
        ...rule,
        attribute_group_id: attributeGroupId,
        attribute_id: e.target.value,
      });
    },
    [attributeGroupId, onChange, rule]
  );

  const handleChangeAttributeValue = useCallback(
    (e) => {
      setAttributeValue(e.target.value);
      onChange?.({
        ...DEFAULT_STATE,
        ...rule,
        value: e.target.value,
      });
    },
    [onChange, rule]
  );

  const handleChangeCheckAttributeValue = useCallback(
    (e) => {
      setCheckAttributeValue(e.target.checked);
      onChange?.({
        ...DEFAULT_STATE,
        ...rule,
        check_value: e.target.checked,
      });
    },
    [onChange, rule]
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
