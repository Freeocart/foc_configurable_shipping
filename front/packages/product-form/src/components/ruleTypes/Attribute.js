import React, { useState, useMemo, useCallback } from "react";
import { useAppSettings } from "../../lib/AppSettings";
import { useI18n } from "react-simple-i18n";
import { intOrNull } from "common/functions";

import { OPTION_VALUE_NOT_SELECTED } from "common/constants";

const DEFAULT_STATE = {
  attribute_group_id: OPTION_VALUE_NOT_SELECTED,
  attribute_id: OPTION_VALUE_NOT_SELECTED,
  attribute_check_value: false,
};

export default function Attribute({ value: propValue, onChange }) {
  const [attributeGroupId, setAttributeGroupId] = useState(
    intOrNull(propValue.attribute_group_id)
  );
  const [attributeId, setAttributeId] = useState(
    intOrNull(propValue.attribute_id)
  );

  const [attributeValue, setAttributeValue] = useState(
    intOrNull(propValue.attribute_value)
  );
  const [checkAttributeValue, setCheckAttributeValue] = useState(
    propValue.attribute_check_value
  );

  const { attributeGroups, attributes } = useAppSettings();
  const { t } = useI18n();

  const handleSelectAttributeGroup = useCallback(
    (e) => {
      setAttributeGroupId(e.target.value);
      setAttributeId(OPTION_VALUE_NOT_SELECTED);
      onChange?.({
        ...DEFAULT_STATE,
        ...propValue,
        attribute_group_id: e.target.value,
        attribute_id: OPTION_VALUE_NOT_SELECTED,
        attribute_value: OPTION_VALUE_NOT_SELECTED, // reset value here
      });
    },
    [onChange, propValue]
  );

  const handleSelectAttribute = useCallback(
    (e) => {
      setAttributeId(e.target.value);
      onChange?.({
        ...DEFAULT_STATE,
        ...propValue,
        attribute_id: e.target.value,
      });
    },
    [onChange, propValue]
  );

  const handleChangeAttributeValue = useCallback(
    (e) => {
      setAttributeValue(e.target.value);

      const newRule = {
        ...DEFAULT_STATE,
        ...propValue,
        attribute_value: e.target.value,
      };

      onChange?.(newRule);
    },
    [onChange, propValue]
  );

  const handleChangeCheckAttributeValue = useCallback(
    (e) => {
      setCheckAttributeValue(e.target.checked);
      onChange?.({
        ...DEFAULT_STATE,
        ...propValue,
        attribute_check_value: e.target.checked,
      });
    },
    [onChange, propValue]
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
    <div className="form-horizontal RuleFormContainer">
      <div className="col-sm-3">
        <label>{t("Attribute group")}</label>
        <select
          className="form-control"
          value={attributeGroupId}
          onChange={handleSelectAttributeGroup}
        >
          <option value={OPTION_VALUE_NOT_SELECTED}>{t("Not selected")}</option>
          {attributeGroups.map((attributeGroup) => (
            <option value={attributeGroup.attribute_group_id}>
              {attributeGroup.name}
            </option>
          ))}
        </select>
      </div>
      <div className="col-sm-3">
        <label>{t("Attribute")}</label>
        <select
          className="form-control"
          value={attributeId}
          onChange={handleSelectAttribute}
        >
          <option value={OPTION_VALUE_NOT_SELECTED}>{t("Not selected")}</option>
          {filteredAttributes.map((attribute) => (
            <option value={attribute.attribute_id}>{attribute.name}</option>
          ))}
        </select>
      </div>
      <div className="col-sm-3">
        <label>{t("Attribute value")}</label>
        <input
          type="text"
          placeholder={t("Attribute value")}
          value={attributeValue}
          onChange={handleChangeAttributeValue}
          className="form-control"
        />
      </div>
      <div className="col-sm-3 text-center">
        <label className="checkbox">
          <input
            type="checkbox"
            checked={checkAttributeValue}
            onChange={handleChangeCheckAttributeValue}
          />
          <span>{t("Check attribute value?")}</span>
        </label>
      </div>
    </div>
  );
}
