import React from "react";

import ShippingMethods from "./components/ShippingMethods";
import ExportImport from "./components/ExportImport";
import Output from "./components/Output";

import "./App.css";


function App({ outputName }) {
  return (
    <div className="App">
      <ShippingMethods />
      <ExportImport />
      <Output outputName={outputName} />
    </div>
  );
}

export default App;
