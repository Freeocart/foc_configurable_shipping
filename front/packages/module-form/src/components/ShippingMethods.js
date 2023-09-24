import React, { useCallback } from 'react'
import { useAppState } from '../lib/AppState'
import ShippingMethodSetup from './ShippingMethodSetup'
import { useI18n } from 'react-simple-i18n';

export default function ShippingMethods () {
  const { t } = useI18n();

  const {
    shippingMethods = [],
    addNewShippingMethod,
    currentShippingMethodId,
    removeShippingMethod,
    setCurrentShippingMethodId
  } = useAppState()

  const handleChangeActiveTabClick = useCallback((event, nextTabId) => {
    event.preventDefault()
    event.stopPropagation()
    setCurrentShippingMethodId(nextTabId)
  }, [setCurrentShippingMethodId])

  const handleCreateNewMethodClick = useCallback((event) => {
    event.preventDefault()
    addNewShippingMethod()
  }, [addNewShippingMethod])

  const handleDeleteShippingMethodClick = useCallback((event, id) => {
    event.preventDefault()
    event.stopPropagation()
    removeShippingMethod(id)
  }, [removeShippingMethod])

  return <div className=''>
    <ul className='nav nav-tabs'>
      {Object.keys(shippingMethods).map(id => (
        <li
          key={id}
          className={ id === currentShippingMethodId ? 'active' : '' }
          onClick={(event) => handleChangeActiveTabClick(event, id)}
        >
          <a href={`#shipping_method_${id}`}>
            <span style={{ verticalAlign: 'middle', marginRight: 10 }}>{id}</span>
            <button className="btn btn-danger btn-xs" onClick={(event) => handleDeleteShippingMethodClick(event, id)}>
              <i className="fa fa-times" />
            </button>
          </a>
        </li>
      ))}

      <li>
        <button className='btn btn-default btn-lg' onClick={handleCreateNewMethodClick}>
          <i className="fa fa-plus"></i> {t('Add shipping method')}
        </button>
      </li>
    </ul>

    <div className="tab-content">
      { !!currentShippingMethodId && <ShippingMethodSetup id={currentShippingMethodId} key={currentShippingMethodId} /> }
    </div>

  </div>
}