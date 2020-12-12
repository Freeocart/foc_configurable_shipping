import React, { useContext } from 'react'
import { ConfigContext } from './ConfigProvider'
import { useI18n } from 'react-simple-i18n'
import Ruleset from './Ruleset'

import {
  RULES_TOTAL_SET_MAX_INCREASE_VALUE,
  RULES_TOTAL_SET_MIN_INCREASE_VALUE,
  RULES_TOTAL_SUM_INCREASE_VALUES,
  RULES_TOTAL_SET_MIN_NON_ZERO_INCREASE_VALUE,
  PRODUCT_INCREASE_STRATEGY_SUM,
  PRODUCT_INCREASE_STRATEGY_MIN,
  PRODUCT_INCREASE_STRATEGY_MAX,
  PRODUCT_INCREASE_STRATEGY_MIN_NON_ZERO
} from '../constants'

import './Rules.css'

function Rules () {
  const {
    rulesets,
    addNewRuleset,
    totalMode,
    setTotalMode,
    productIncreaseStrategy,
    setProductIncreaseStrategy
  } = useContext(ConfigContext)

  const { t } = useI18n()

  const handleCreateRulesetClick = e => {
    e.preventDefault()
    addNewRuleset()
  }

  const handleTotalModeChange = e => {
    setTotalMode(e.target.value)
  }

  const handleProductIncreaseStrategyChange = e => {
    console.log(e.target.value)
    setProductIncreaseStrategy(e.target.value)
  }

  return <>
    <div className="row">
      <div className="col-md-12">
        <div className="form-group">
          <label className="col-sm-4 control-label">{ t("Product increase strategy") }</label>
          <div className="col-sm-8">
            <select className="form-control" value={ productIncreaseStrategy } onChange={ handleProductIncreaseStrategyChange }>
              <option value={ PRODUCT_INCREASE_STRATEGY_MAX }>{ t(`Product increase strategy: ${ PRODUCT_INCREASE_STRATEGY_MAX }`) }</option>
              <option value={ PRODUCT_INCREASE_STRATEGY_MIN }>{ t(`Product increase strategy: ${ PRODUCT_INCREASE_STRATEGY_MIN }`) }</option>
              <option value={ PRODUCT_INCREASE_STRATEGY_SUM }>{ t(`Product increase strategy: ${ PRODUCT_INCREASE_STRATEGY_SUM }`) }</option>
              <option value={ PRODUCT_INCREASE_STRATEGY_MIN_NON_ZERO }>{ t(`Product increase strategy: ${ PRODUCT_INCREASE_STRATEGY_MIN_NON_ZERO }`) }</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-md-12">
        <div className="form-group">
          <label className="col-sm-4 control-label">{ t("Total mode") }</label>
          <div className="col-sm-8">
            <select className="form-control" value={ totalMode } onChange={ handleTotalModeChange }>
              <option value={ RULES_TOTAL_SET_MAX_INCREASE_VALUE }>{ t(`Total mode: ${ RULES_TOTAL_SET_MAX_INCREASE_VALUE }`) }</option>
              <option value={ RULES_TOTAL_SET_MIN_INCREASE_VALUE }>{ t(`Total mode: ${ RULES_TOTAL_SET_MIN_INCREASE_VALUE }`) }</option>
              <option value={ RULES_TOTAL_SUM_INCREASE_VALUES }>{ t(`Total mode: ${ RULES_TOTAL_SUM_INCREASE_VALUES }`) }</option>
              <option value={ RULES_TOTAL_SET_MIN_NON_ZERO_INCREASE_VALUE }>{ t(`Total mode: ${ RULES_TOTAL_SET_MIN_NON_ZERO_INCREASE_VALUE }`) }</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    { Object.entries(rulesets).map(([key, val]) => (
      <div key={ key }>
        <Ruleset id={ key } ruleset={ val } />
      </div>
    )) }

    <button className="btn btn-success" onClick={ handleCreateRulesetClick }>{ t('Add new ruleset') }</button>
  </>
}

export default Rules