import React, { useContext, useState } from 'react'
import { ConfigContext } from '../ConfigProvider'
import { useI18n } from 'react-simple-i18n'

import './Countries.css'

const filterCountries = (filter, data = []) => data.filter(item => {
  if (!item || !item.name) {
    return false
  }

  return item.name
    .toLowerCase()
    .includes(filter.toLowerCase())
})

export default function Countries ({ rulesetId, rule: propRule }) {
  const [ filter, setFilter ] = useState('')
  const { countries, updateRule } = useContext(ConfigContext)
  const [ selectedCountries, setSelectedCountries ] = useState(propRule.value || [])

  const [ showCheckedOnly, setShowCheckedOnly ] = useState(false)

  const { t } = useI18n()

  const toggleCountry = country_id => {
    const countriesList = selectedCountries.includes(country_id)
      ? selectedCountries.filter(id => id !== country_id)
      : [ ...selectedCountries, country_id ]

    setSelectedCountries(countriesList)
    updateRule(rulesetId, propRule, {
      value: countriesList
    })
  }

  const handleChangeShowCheckedOnly = e => {
    setShowCheckedOnly(e.target.checked)
  }

  const items = showCheckedOnly
    ? filterCountries(filter, countries).filter(country => selectedCountries.includes(country.country_id))
    : filterCountries(filter, countries)

  return <div className="Countries">
    <div className="row">
      <div className="col-sm-3">
        <input className="form-control" placeholder={ t('Country filter') } type="text" value={ filter } onChange={ e => setFilter(e.target.value) } />

        <label className="checkbox">
          { t('Show checked only') }
          <input type="checkbox" checked={ showCheckedOnly } onChange={ handleChangeShowCheckedOnly } />
        </label>
      </div>

      <div className="col-sm-9">
        <div className="Countries__list">
        { items.map((country, index) => (
          <div key={ index } className="Countries__country">
            <input type="checkbox" checked={ selectedCountries.includes(country.country_id) } onChange={ e => toggleCountry(country.country_id) } /> { country.name }
          </div>
        ))}
        </div>
      </div>
    </div>
  </div>
}