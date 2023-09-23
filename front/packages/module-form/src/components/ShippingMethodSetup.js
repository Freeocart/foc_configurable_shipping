import React, { useCallback } from 'react'
import { useI18n } from 'react-simple-i18n';

import Rules from './Rules';

import { COST_INCREASE_MODE_MAX, COST_INCREASE_MODE_MIN, COST_INCREASE_MODE_MIN_NON_ZERO, COST_INCREASE_MODE_NON_ZERO_INCREASE, COST_INCREASE_MODE_SUM } from '../config/constants';
import { OPTION_VALUE_NOT_SELECTED } from 'common/constants';
import { useAppSettings } from '../lib/AppSettings';
import MultilanguageField from './MultilanguageField';

export default function ShippingMethodSetup () {
  const { t } = useI18n();
  const {
    geoZones = [],
    costIncreaseMode,
    label, setLabel,
    group, setGroup,
    geoZone, setGeoZone,
    disableOnZero, setDisableOnZero,
    setCostIncreaseMode
  } = useAppSettings();

  const handleCostIncreaseModeChange = useCallback((event) => {
    const nextIncreaseMode = event.target.value
    setCostIncreaseMode(nextIncreaseMode)
  }, [ setCostIncreaseMode ])

  const handleLabelChange = useCallback((event) => {
    setLabel(event.target.value)
  }, [ setLabel ])

  const handleGroupChange = useCallback((event) => {
    setGroup(event.target.value)
  }, [ setGroup ])

  const handleDisableOnZeroChange = useCallback(() => {
    setDisableOnZero(!disableOnZero)
  }, [disableOnZero, setDisableOnZero])

  const handleGeoZoneChange = useCallback((event) => {
    setGeoZone(event.target.value)
  }, [setGeoZone])

  return <>
    <div className='form-group'>
      <label className="col-sm-4 control-label">
        {t("Shipping label")}
      </label>
      <div className='col-sm-8'>
        <MultilanguageField
          className="form-control"
          placeholder={t("Shipping label")}
          type="text"
          value={label}
          onChange={handleLabelChange}
        />
      </div>
    </div>

    <div className='form-group'>
      <label className="col-sm-4 control-label">
        {t("Shipping group")}
      </label>
      <div className='col-sm-8'>
        <MultilanguageField
          className="form-control"
          placeholder={t("Shipping group")}
          type="text"
          value={group}
          onChange={handleGroupChange}
        />
      </div>
    </div>

    <div className='form-group'>
      <label className="col-sm-4 control-label">
        {t("Base cost")}
      </label>
      <div className='col-sm-8'>
        <input className='form-control' type="text" placeholder={t("Base cost")} />
      </div>
    </div>

    <div className="form-group">
      <label className="col-sm-4 control-label">
        {t("Cost increase mode")}
      </label>
      <div className="col-sm-8">
        <select
          className="form-control"
          value={costIncreaseMode}
          onChange={handleCostIncreaseModeChange}
        >
          <option value={COST_INCREASE_MODE_MAX}>
            {t('Cost increase mode max')}
          </option>
          <option value={COST_INCREASE_MODE_MIN}>
            {t('Cost increase mode min')}
          </option>
          <option value={COST_INCREASE_MODE_SUM}>
            {t('Cost increase mode sum')}
          </option>
          <option value={COST_INCREASE_MODE_NON_ZERO_INCREASE}>
            {t('Cost increase mode min from non zero and base cost')}
          </option>
          <option value={COST_INCREASE_MODE_MIN_NON_ZERO}>
            {t('Cost increase mode use if non zero')}
          </option>
        </select>
      </div>
    </div>

    <div className="form-group">
      <label className="col-sm-4 control-label">
        {t("Disable if total is zero")}
      </label>
      <div className="col-sm-8">
        <div className='checkbox-inline pull-left'>
          <input
            type="checkbox"
            checked={disableOnZero}
            onChange={handleDisableOnZeroChange}
          />
        </div>
      </div>
    </div>

    <div className="form-group">
      <label className="col-sm-4 control-label">
        {t("Geozone")}
      </label>
      <div className="col-sm-8">
        <select
          className="form-control"
          value={geoZone}
          onChange={handleGeoZoneChange}
        >
          <option value={OPTION_VALUE_NOT_SELECTED}>
            {t("Not selected")}
          </option>
          {geoZones.map((zone) => (
            <option key={zone.geo_zone_id} value={zone.geo_zone_id}>
              {zone.name}
            </option>
          ))}
        </select>
      </div>
    </div>

    <Rules />
  </>
}