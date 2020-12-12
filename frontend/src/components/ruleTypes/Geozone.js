import React, { useContext, useState } from 'react'
import { ConfigContext } from '../ConfigProvider'
import { useI18n } from 'react-simple-i18n'

export default function Geozone ({ rulesetId, rule: propRule }) {
  const [ rule, setRule ] = useState(propRule)
  const { geoZones = [], updateRule } = useContext(ConfigContext)

  const { t } = useI18n()

  const onLanguageChange = e => {
    const newRule = {
      ...rule,
      zone_id: e.target.value
    }

    setRule(newRule)
    updateRule(rulesetId, propRule, {
      ...rule,
      ...newRule
    })
  }

  return <div className="Language">
    <div className="form-horizontal">
      <label className="col-sm-2">{ t('If customer geozone is') }</label>
      <div className="col-sm-10">
        <select className="form-control" value={ rule.zone_id } onChange={ onLanguageChange }>
          { geoZones.map(zone => (
            <option key={ zone.geo_zone_id } value={ zone.geo_zone_id }>{ zone.name }</option>
          ))}
        </select>
      </div>
    </div>
  </div>
}