import React, { useState, useEffect } from "react";
import { useAppSettings } from "../lib/AppSettings";

export default function Output({ outputName }) {
  const { state } = useAppSettings();
  const [output, setOutput] = useState(JSON.stringify(state));

  useEffect(() => {
    setOutput(JSON.stringify(state));
  }, [state]);

  return (
    <textarea
      testId="Test:Output"
      className="Rules__output"
      name={outputName}
      value={output}
    />
  );
}
