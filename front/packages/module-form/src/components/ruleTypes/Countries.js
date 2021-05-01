import React, { useState, useCallback, useMemo } from "react";
import { useAppSettings } from "../../lib/AppSettings";
import { useI18n } from "react-simple-i18n";

import "./Countries.css";

const filterCountries = (filter, data = []) =>
  data.filter((item) => {
    if (!item || !item.name) {
      return false;
    }

    return item.name.toLowerCase().includes(filter.toLowerCase());
  });

export default function Countries({ rulesetId, rule: propRule }) {
  const [filter, setFilter] = useState("");
  const { countries, updateRule } = useAppSettings();
  const [selectedCountries, setSelectedCountries] = useState(
    propRule.countries_ids || []
  );

  const [showCheckedOnly, setShowCheckedOnly] = useState(false);

  const { t } = useI18n();

  const toggleCountry = useCallback(
    (country_id) => {
      const countriesList = selectedCountries.includes(country_id)
        ? selectedCountries.filter((id) => id !== country_id)
        : [...selectedCountries, country_id];

      setSelectedCountries(countriesList);
      updateRule(rulesetId, propRule, {
        countries_ids: countriesList,
      });
    },
    [propRule, rulesetId, selectedCountries, updateRule]
  );

  const handleChangeShowCheckedOnly = useCallback((e) => {
    setShowCheckedOnly(e.target.checked);
  }, []);

  const items = useMemo(
    () =>
      showCheckedOnly
        ? filterCountries(filter, countries).filter((country) =>
            selectedCountries.includes(country.country_id)
          )
        : filterCountries(filter, countries),
    [countries, filter, selectedCountries, showCheckedOnly]
  );

  return (
    <div className="Countries container">
      <div className="row">
        <div className="col-sm-12 text-left">
          <label>{t("If customer delivery country is")}</label>
        </div>
        <div className="col-sm-3">
          <input
            className="form-control"
            placeholder={t("Country filter")}
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />

          <label className="checkbox">
            <input
              type="checkbox"
              checked={showCheckedOnly}
              onChange={handleChangeShowCheckedOnly}
            />
            <span>{t("Show checked only")}</span>
          </label>
        </div>

        <div className="col-sm-9">
          <div className="Countries__list">
            {items.map((country, index) => (
              <div key={index} className="Countries__country">
                <input
                  type="checkbox"
                  checked={selectedCountries.includes(country.country_id)}
                  onChange={(e) => toggleCountry(country.country_id)}
                />{" "}
                <span>{country.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
