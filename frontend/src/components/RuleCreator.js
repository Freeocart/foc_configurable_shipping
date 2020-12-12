import React, { useState, useContext } from 'react'
import { RULE_TYPES } from './ruleTypes'
import { ConfigContext } from './ConfigProvider'

import './RuleCreator.css'
import { useI18n } from 'react-simple-i18n'

export default function RuleCreator ({ rulesetId }) {
  const [ selectedType, setSelectedType ] = useState(Object.keys(RULE_TYPES)[0])
  const { addNewRule } = useContext(ConfigContext)

  const { t } = useI18n()

  const handleRuleTypeChange = e => {
    setSelectedType(e.target.value)
  }

  const handleRuleTypeCreateClick = e => {
    e.preventDefault()
    addNewRule(rulesetId, selectedType)
  }

  return <div className="RuleCreator">
    <h5>{ t('Add new rule') }</h5>

    <div className="input-group">
      <select className="form-control" onChange={ handleRuleTypeChange } value={ selectedType }>
        { Object.entries(RULE_TYPES).map(([key, ruleType]) => (
          <option key={ key } value={ key }>{ t(ruleType.name) }</option>
        ))}
      </select>
      <div className="input-group-btn">
        <button className="btn btn-primary" onClick={ handleRuleTypeCreateClick }>{ t('Add') }</button>
      </div>
    </div>
  </div>
}