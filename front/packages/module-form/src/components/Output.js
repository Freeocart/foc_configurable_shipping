import React, { useState, useEffect } from "react";
import { useAppState } from "../lib/AppState";

export default function Output({ outputName }) {
  const { state } = useAppState();
  const [output, setOutput] = useState(state);

  useEffect(() => {
    setOutput(JSON.stringify(state));
  }, [state]);

  return (
    <textarea
      className="App__output"
      name={outputName}
      value={output}
      readOnly
    ></textarea>
  );
}
