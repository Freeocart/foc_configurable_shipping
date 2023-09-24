import React, { useCallback } from 'react'
import { useAppState } from '../lib/AppState'
import ShippingMethodSetup from './ShippingMethodSetup'

export default function ShippingMethods () {
  const {
    shippingMethods = [],
    addNewShippingMethod,
    currentShippingMethod,
    removeShippingMethod,
    setCurrentShippingMethod
  } = useAppState()

  const handleChangeActiveTabClick = useCallback((event, nextTabId) => {
    event.preventDefault()
    event.stopPropagation()
    setCurrentShippingMethod(nextTabId)
  }, [setCurrentShippingMethod])

  const handleCreateNewMethodClick = useCallback((event) => {
    event.preventDefault()
    const nextId = addNewShippingMethod()
    // setCurrentShippingMethod(nextId)
  }, [addNewShippingMethod, setCurrentShippingMethod])

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
          className={ id === currentShippingMethod.id ? 'active' : '' }
          onClick={(event) => handleChangeActiveTabClick(event, id)}
        >
          <a href={`#shipping_method_${id}`}>
            <span style={{ verticalAlign: 'middle', marginRight: 10 }}>{id}</span>
            <button className="btn btn-danger btn-xs" onClick={(event) => handleDeleteShippingMethodClick(event, id)}><i className="fa fa-times" /></button>
          </a>
        </li>
      ))}

      <li>
        <button className='btn btn-default btn-lg' onClick={handleCreateNewMethodClick}><i className="fa fa-plus"></i> Add</button>
      </li>
    </ul>

    <div className="tab-content">
      { !!currentShippingMethod?.id && <ShippingMethodSetup id={currentShippingMethod.id} key={currentShippingMethod.id} /> }
    </div>

  </div>
}