import React, { useState, useEffect } from "react";
import { useAppSettings } from "../lib/AppSettings";

export default function Output({ outputName }) {
  const { state } = useAppSettings();
  const [output, setOutput] = useState(state);

  useEffect(() => {
    setOutput(JSON.stringify(state));
  }, [state]);

  return (
    <textarea
      className="Rules__output"
      name={outputName}
      value={output}
    ></textarea>
  );
}
