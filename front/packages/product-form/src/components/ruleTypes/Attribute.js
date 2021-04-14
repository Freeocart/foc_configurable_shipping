import React, { useState, useMemo, useCallback } from "react";
import { useAppSettings } from "../../lib/AppSettings";
import { useI18n } from "react-simple-i18n";
import { intOrNull } from "../../lib/helpers";

import { OPTION_VALUE_NOT_SELECTED } from "common/constants";

const DEFAULT_STATE = {
  attribute_group_id: null,
  attribute_id: null,
  check_value: false,
};

export default function Attribute({ value: propValue, onChange }) {
  const [attributeGroupId, setAttributeGroupId] = useState(
    intOrNull(propValue.attribute_group_id)
  );
  const [attributeId, setAttributeId] = useState(
    intOrNull(propValue.attribute_id)
  );
  console.log("pv:", propValue);
  const [attributeValue, setAttributeValue] = useState(propValue.value);
  const [checkAttributeValue, setCheckAttributeValue] = useState(
    propValue.check_value
  );
  const { attributeGroups, attributes } = useAppSettings();
  const { t } = useI18n();

  const handleSelectAttributeGroup = useCallback(
    (e) => {
      setAttributeGroupId(e.target.value);
      onChange?.({
        ...DEFAULT_STATE,
        ...propValue,
        attribute_group_id: e.target.value,
        value: "", // reset value here
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
        value: e.target.value,
      };

      console.log("send to onChange->", newRule);
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
        check_value: e.target.checked,
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
    <div className="form-horizontal">
      <div className="col-sm-4">
        <span>{t("Attribute group")}</span>
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
      <div className="col-sm-4">
        <span>{t("Attribute")}</span>
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
