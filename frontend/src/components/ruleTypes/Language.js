import React, { useContext, useState } from 'react'
import { ConfigContext } from '../ConfigProvider'
import { useI18n } from 'react-simple-i18n'

export default function Language ({ rulesetId, rule: propRule }) {
  const [ rule, setRule ] = useState(propRule)
  const { languages, updateRule } = useContext(ConfigContext)

  const { t } = useI18n()

  const onLanguageChange = e => {
    const newRule = {
      ...rule,
      language_id: e.target.value
    }

    setRule(newRule)
    updateRule(rulesetId, propRule, {
      ...rule,
      ...newRule
    })
  }

  return <div className="Language">
    <div className="form-horizontal">
      <label className="col-sm-2">{ t('If customer language is') }</label>
      <div className="col-sm-10">
        <select className="form-control" value={ rule.language_id } onChange={ onLanguageChange }>
          { languages.map(language => (
            <option key={ language.id } value={ language.id }>{ language.name }</option>
          ))}
        </select>
      </div>
    </div>
  </div>
}