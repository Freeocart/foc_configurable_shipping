import React, { useState, useContext } from 'react'
import { ConfigContext } from '../ConfigProvider'
import { useI18n } from 'react-simple-i18n'
import { intOrNull } from '../../lib'

export default function Attribute ({ rulesetId, rule }) {
  const [ attributeGroupId, setAttributeGroupId ] = useState(intOrNull(rule.attribute_group_id))
  const [ attributeId, setAttributeId ] = useState(intOrNull(rule.attribute_id))
  const [ attributeValue, setAttributeValue ] = useState(rule.value)
  const [ checkAttributeValue, setCheckAttributeValue ] = useState(rule.check_value)
  const { attributeGroups, attributes, updateRule } = useContext(ConfigContext)
  const { t } = useI18n()

  const handleSelectAttributeGroup = e => {
    setAttributeGroupId(e.target.value)
    updateRule(
      rulesetId,
      rule,
      {
        attribute_group_id: e.target.value,
        attribute_id: null,
        value: null,
        check_value: false
      }
    )
  }

  const handleSelectAttribute = e => {
    setAttributeId(e.target.value)
    updateRule(
      rulesetId,
      rule,
      {
        attribute_id: e.target.value
      }
    )
  }

  const handleChangeAttributeValue = e => {
    setAttributeValue(e.target.value)
    updateRule(
      rulesetId,
      rule,
      {
        value: e.target.value
      }
    )
  }

  const handleChangeCheckAttributeValue = e => {
    setCheckAttributeValue(e.target.checked)
    updateRule(
      rulesetId,
      rule,
      {
        check_value: e.target.checked
      }
    )
  }

  const filteredAttributes = attributes.filter(
    attribute => parseInt(attribute.attribute_group_id) === parseInt(attributeGroupId)
  )

  return <div className="form-horizontal">
    <div className="col-sm-4">
      <span>{ t('Attribute group') }</span>
      <select className="form-control" value={ attributeGroupId } onChange={ handleSelectAttributeGroup }>
        <option value={ null }>{ t('Not selected') }</option>
        { attributeGroups.map(attributeGroup => (
          <option value={ attributeGroup.attribute_group_id }>{ attributeGroup.name }</option>
        ))}
      </select>
    </div>
    <div className="col-sm-4">
    <span>{ t('Attribute') }</span>
      <select className="form-control" value={ attributeId } onChange={ handleSelectAttribute }>
        <option value={ null }>{ t('Not selected') }</option>
        { filteredAttributes.map(attribute => (
        <option value={ attribute.attribute_id }>{ attribute.name }</option>
        ))}
      </select>
    </div>
    <div className="col-sm-4">
      <input type="text" placeholder={ t('Attribute value') } value={ attributeValue } onChange={ handleChangeAttributeValue } className="form-control"/>

      <label className="checkbox">
        { t('Check attribute value?') }
        <input type="checkbox" checked={ checkAttributeValue } onChange={ handleChangeCheckAttributeValue } />
      </label>
    </div>
  </div>
}