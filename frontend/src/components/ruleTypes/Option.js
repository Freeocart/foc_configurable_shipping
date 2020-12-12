import React, { useState, useContext, useEffect, useMemo } from 'react'
import { ConfigContext } from '../ConfigProvider'
import { useI18n } from 'react-simple-i18n'
import { intOrNull } from '../../lib'

import { OPTION_VALUE_IS_ANY } from '../../constants'

export default function Option ({ rulesetId, rule }) {
  const [ selectedOptionId, setSelectedOptionId ] = useState(intOrNull(rule.option_id))
  const [ selectedOptionValueId, setSelectedOptionValueId ] = useState(intOrNull(rule.value))
  const { options, optionsValues, updateRule } = useContext(ConfigContext)
  const { t } = useI18n()

  const filteredOptionValues = useMemo(() => {
    return optionsValues.filter(optionValue => parseInt(optionValue.option_id) === parseInt(selectedOptionId))
  }, [ selectedOptionId, optionsValues ])

  const handleSelectOptionId = e => {
    setSelectedOptionId(e.target.value)
    updateRule(rulesetId, rule, { option_id: e.target.value, value: null })
  }

  const handleSelectOptionValueId = e => {
    setSelectedOptionValueId(e.target.value)
    updateRule(rulesetId, rule, { value: e.target.value })
  }


  return <div className="form-horizontal">
    <div className="col-sm-6">
      <select className="form-control" value={ selectedOptionId } onChange={ handleSelectOptionId }>
      { options.map(option => (
        <option value={ option.option_id }>{ option.name }</option>
      ))}
      </select>
    </div>
    <div className="col-sm-6">
      <select className="form-control" value={ selectedOptionValueId } onChange={ handleSelectOptionValueId }>
        <option value={ null }>{ t('Not selected') }</option>
        <option value={ OPTION_VALUE_IS_ANY }>{ t('Any option value') }</option>
      { filteredOptionValues.map(optionValue => (
        <option value={ optionValue.option_value_id }>{ optionValue.name }</option>
      ))}
      </select>
    </div>
  </div>
}