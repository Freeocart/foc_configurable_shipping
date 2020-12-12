import React, { useContext, useState } from 'react'
import { ConfigContext } from '../ConfigProvider'
import { useI18n } from 'react-simple-i18n'

export default function Currency ({ rulesetId, rule: propRule }) {
  const [ rule, setRule ] = useState(propRule)
  const { currencies, updateRule } = useContext(ConfigContext)

  const { t } = useI18n()

  const onCurrencyChange = e => {
    const newRule = {
      ...rule,
      currency_id: e.target.value
    }

    setRule(newRule)
    updateRule(rulesetId, propRule, {
      ...rule,
      ...newRule
    })
  }

  return <div className="Language">
    <div className="form-horizontal">
      <label className="col-sm-2">{ t('If selected currency') }</label>
      <div className="col-sm-10">
        <select className="form-control" value={ rule.currency_id } onChange={ onCurrencyChange }>
          { currencies.map(currency => (
            <option key={ currency.currency_id } value={ currency.currency_id }>{ currency.title }</option>
          ))}
        </select>
      </div>
    </div>
  </div>
}