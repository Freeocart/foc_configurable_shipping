import React, { useContext } from 'react'
// import Language from './ruleTypes/Language'
// import Option from './ruleTypes/Option'
import { getRuleTypeComponent } from './ruleTypes'
import { ConfigContext } from './ConfigProvider'

import './ruleTypes/Rule.css'
import { useI18n } from 'react-simple-i18n'

function RulePicker ({ rulesetId, rule }) {
  const RuleComponent = getRuleTypeComponent(rule.type)
  const { deleteRule } = useContext(ConfigContext)

  const { t } = useI18n()

  const handleDeleteRuleClick = e => {
    e.preventDefault()
    deleteRule(rulesetId, rule)
  }

  if (RuleComponent) {
    return <div className="Rule form-horizontal">
      <div className="form-group">
        <RuleComponent rulesetId={ rulesetId } rule={ rule } />
      </div>
      <div className="form-group">
        <button className="btn btn-danger" onClick={ handleDeleteRuleClick }>{ t('Delete rule') }</button>
      </div>
    </div>
  }
  else {
    return <>No rule parser for { rule.type }</>
  }
}

export default RulePicker