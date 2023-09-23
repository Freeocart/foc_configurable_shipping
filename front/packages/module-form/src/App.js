import React from "react";

import ShippingMethodSetup from "./components/ShippingMethodSetup";
import ExportImport from "./components/ExportImport";
import Output from "./components/Output";

import "./App.css";


function App({ outputName }) {
  return (
    <div className="App">
      <ShippingMethodSetup />
      <ExportImport />
      <Output outputName={outputName} />
    </div>
  );
}

export default App;
