import React, { useContext, useState } from 'react'
import { ConfigContext } from './ConfigProvider'
import { useI18n } from 'react-simple-i18n'

import './ExportImport.css'

function ExportImport () {
  const { state, resetState, resetRulesets } = useContext(ConfigContext)
  const [ exportValue, setExportValue ] = useState('')
  const [ importValue, setImportValue ] = useState('')

  const { t } = useI18n()

  const handleExportClick = (e) => {
    e.preventDefault()
    setExportValue(JSON.stringify(state))
  }

  const handleImportClick = (e) => {
    e.preventDefault()
    try {
      const data = JSON.parse(importValue)
      resetState(data)
    }
    catch (e) {
      alert('Invalid json data! Cannot import')
    }
  }

  const handleImportValueChange = (e) => {
    setImportValue(e.target.value)
  }

  const handleClearClick = (e) => {
    e.preventDefault()
    resetRulesets()
  }

  return <div className="ExportImport container">
    <h4 className="ExportImport__title">{ t('Import/export rules') }</h4>

    <div className="row">
      <div className="col-md-6">
        <textarea className="form-control" rows={ 8 } placeholder={ t('Click "Export" button to export rules as JSON data') } value={ exportValue } />
        <div className="form-group">
          <button class="btn btn-warning" onClick={ handleExportClick }>{ t('Export') }</button>
        </div>
      </div>

      <div className="col-md-6">
        <textarea value={ importValue } rows={ 8 } placeholder={ t('Rules JSON data to import') } className="form-control" onChange={ handleImportValueChange }/>
        <div className="form-group">
          <button class="btn btn-primary" onClick={ handleImportClick }>{ t('Import') }</button>
        </div>
      </div>
    </div>

    <div className="row">
      <div className="col-md-6 col-md-offset-3">
        <button className="btn btn-danger" onClick={ handleClearClick }>{ t('Clear rulesets') }</button>
      </div>
    </div>
  </div>
}

export default ExportImport