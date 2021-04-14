import { useCallback } from "react";
import { useI18n } from "react-simple-i18n";
import { useAppSettings } from "./lib/AppSettings";

import Condition from "./components/Condition";
import RulesetResolver from "./components/RulesetResolver";
import Output from "./components/Output";

import "./App.css";

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
      console.log("pl", payload);
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
      {rules.map((ruleset, rulesetIndex) => (
        <div className="Ruleset">
          <div key={rulesetIndex}>
            {ruleset.conditions.map((condition, ruleIndex) => (
              <div key={ruleIndex}>
                {ruleIndex > 0 && (
                  <div className="row">
                    <div className="col-md-12">
                      <label>{t("And")}</label>
                    </div>
                  </div>
                )}

                <Condition
                  value={condition}
                  onChange={(payload) =>
                    handleConditionChange({ rulesetIndex, ruleIndex }, payload)
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
                {t("Add condition")}
              </button>
            </div>

            <hr />
            <RulesetResolver
              onChange={(payload) =>
                handleRulesetResolverChange(rulesetIndex, payload)
              }
              value={ruleset.resolve}
            />

            <div className="row">
              <div className="col-md-12 text-right">
                <button
                  className="btn btn-danger btn-xs"
                  type="button"
                  onClick={() => handleDeleteRuleset(rulesetIndex)}
                >
                  {t("Delete ruleset")}
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      <hr />
      <button
        className="btn btn-success btn-block btn-lg"
        type="button"
        onClick={handleAddRulesetClick}
      >
        {t("Add ruleset")}
      </button>

      <Output outputName={outputName} />
    </div>
  );
}

export default App;
