import React from 'react'
import { ConfigProvider } from './components/ConfigProvider'

import Rules from './components/Rules'
import ExportImport from './components/ExportImport'
import Output from './components/Output'

import './App.css'

function App({ state, ocInfo, outputName }) {
  return (
    <ConfigProvider state={ state } ocInfo={ ocInfo }>
      <div className="App">
        <Rules />
        <ExportImport />
        <Output outputName={ outputName } />
      </div>
    </ConfigProvider>
  );
}

export default App;
