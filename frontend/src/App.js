import React from "react";

import Rules from "./components/Rules";
import ExportImport from "./components/ExportImport";
import Output from "./components/Output";

import "./App.css";

function App({ outputName }) {
  return (
    <div className="App">
      <Rules />
      <ExportImport />
      <Output outputName={outputName} />
    </div>
  );
}

export default App;
