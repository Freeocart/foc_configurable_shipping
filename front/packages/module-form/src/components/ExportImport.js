import React, { useState, useCallback } from "react";
import { useAppState } from "../lib/AppState";
import { useI18n } from "react-simple-i18n";

import "./ExportImport.css";

function ExportImport() {
  const { exportableResult, resetAppState, resetRulesets } = useAppState();
  const [ exportValue, setExportValue ] = useState("");
  const [ importValue, setImportValue ] = useState("");

  const { t } = useI18n();

  const handleExportClick = useCallback(
    (e) => {
      e.preventDefault();
      setExportValue(JSON.stringify(exportableResult));
    },
    [exportableResult]
  );

  const handleImportClick = useCallback(
    (e) => {
      e.preventDefault();
      try {
        const data = JSON.parse(importValue);
        resetAppState(data);
      } catch (e) {
        alert("Invalid json data! Cannot import");
      }
    },
    [importValue, resetAppState]
  );

  const handleImportValueChange = useCallback((e) => {
    setImportValue(e.target.value);
  }, []);

  const handleClearClick = useCallback(
    (e) => {
      e.preventDefault();
      resetRulesets();
    },
    [resetRulesets]
  );

  return (
    <div className="ExportImport container">
      <h4 className="ExportImport__title">{t("Import/export rules")}</h4>

      <div className="row">
        <div className="col-md-6">
          <textarea
            className="form-control"
            rows={8}
            placeholder={t(
              'Click "Export" button to export rules as JSON data'
            )}
            value={exportValue}
            readOnly
          />
          <div className="form-group">
            <button
              type="button"
              className="btn btn-warning"
              onClick={handleExportClick}
            >
              <i className="fa fa-download"></i>&nbsp;
              {t("Export")}
            </button>
          </div>
        </div>

        <div className="col-md-6">
          <textarea
            value={importValue}
            rows={8}
            placeholder={t("Rules JSON data to import")}
            className="form-control"
            onChange={handleImportValueChange}
          />
          <div className="form-group">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleImportClick}
            >
              <i className="fa fa-upload"></i>&nbsp;
              {t("Import")}
            </button>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleClearClick}
          >
            <i className="fa fa-eraser"></i>&nbsp;
            {t("Clear rulesets")}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExportImport;
