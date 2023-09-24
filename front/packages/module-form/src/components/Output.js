import React, { useState, useEffect, useMemo } from "react";
import { useAppState } from "../lib/AppState";

export default function Output({ outputName }) {
  const { exportableResult } = useAppState();
  const [output, setOutput] = useState(JSON.stringify(exportableResult));

  useEffect(() => {
    setOutput(JSON.stringify(exportableResult));
  }, [exportableResult]);

  return (
    <textarea
      className="App__output"
      name={outputName}
      value={output}
      readOnly
    ></textarea>
  );
}
