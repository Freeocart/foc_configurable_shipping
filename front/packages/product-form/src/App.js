import { useCallback } from "react";
import { useI18n } from "react-simple-i18n";
import { useAppSettings } from "./lib/AppSettings";

import Condition from "./components/Condition";
import RulesetResolver from "./components/RulesetResolver";
import Output from "./components/Output";

import "./App.css";
import ConditionLabel from "./components/ConditionLabel";

function App({ outputName }) {
  const { t } = useI18n();
  const {
    rules,
    addRuleset,
    deleteRuleset,
    updateRulesetResolver,
    addCondition,
    updateCondition,
    deleteCondition,
  } = useAppSettings();

  const handleAddRulesetClick = useCallback(() => {
    addRuleset({});
  }, [addRuleset]);

  const handleDeleteRuleset = useCallback(
    (index) => {
      deleteRuleset(index);
    },
    [deleteRuleset]
  );

  const handleRulesetResolverChange = useCallback(
    (rulesetIndex, payload = {}) => {
      updateRulesetResolver(rulesetIndex, payload);
    },
    [updateRulesetResolver]
  );

  const handleAddCondition = useCallback(
    (rulesetIndex) => {
      addCondition(rulesetIndex);
    },
    [addCondition]
  );

  const handleConditionChange = useCallback(
    (indexes, payload) => {
      updateCondition(indexes, payload);
    },
    [updateCondition]
  );

  const handleConditionDelete = useCallback(
    (indexes) => {
      deleteCondition(indexes);
    },
    [deleteCondition]
  );

  return (
    <div className="App">
      <span>test123</span>
      {rules.map((ruleset, rulesetIndex) => (
        <>
          {rulesetIndex > 0 && (
            <ConditionLabel
              className="text-center"
              label={`${t("Or")} ${t("If")}`}
            />
          )}

          <div className="Ruleset" key={rulesetIndex}>
            <div key={rulesetIndex}>
              {ruleset.conditions.map((condition, ruleIndex) => (
                <div key={ruleIndex}>
                  {ruleIndex > 0 && (
                    <ConditionLabel label={`${t("And")} ${t("If")}`} />
                  )}

                  <Condition
                    value={condition}
                    onChange={(payload) =>
                      handleConditionChange(
                        { rulesetIndex, ruleIndex },
                        payload
                      )
                    }
                    onDelete={() =>
                      handleConditionDelete({ rulesetIndex, ruleIndex })
                    }
                    showDeleteBtn={ruleIndex > 0}
                  />
                </div>
              ))}

              <hr />

              <div className="text-center">
                <button
                  className="btn btn-success"
                  type="button"
                  onClick={() => handleAddCondition(rulesetIndex)}
                >
                  <i className="fa fa-plus"></i>&nbsp;
                  <span>{t("Add condition")}</span>
                </button>
              </div>

              <hr />
              <RulesetResolver
                onChange={(payload) =>
                  handleRulesetResolverChange(rulesetIndex, payload)
                }
                value={ruleset.resolve}
              />
              <hr />
              <div className="row">
                <div className="col-md-12 text-center">
                  <button
                    className="btn btn-danger"
                    type="button"
                    onClick={() => handleDeleteRuleset(rulesetIndex)}
                  >
                    <i className="fa fa-trash"></i>&nbsp;
                    <span>{t("Delete ruleset")}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ))}

      <hr />
      <button
        className="btn btn-success btn-block btn-lg"
        type="button"
        onClick={handleAddRulesetClick}
      >
        <i className="fa fa-plus"></i>&nbsp;
        <span>{t("Add ruleset")}</span>
      </button>

      <Output outputName={outputName} />
    </div>
  );
}

export default App;
