import React from "react";
import { useAppSettings } from "../lib/AppSettings";

export default function MultilanguageField({ value, onChange, ...props }) {
  const { languages } = useAppSettings();

  const handleChange = (language_id, event) => {
    const newValue = event.target.value;
    // emulate browser event
    onChange?.({
      ...event,
      target: {
        ...event.target,
        value: {
          ...value,
          [language_id]: newValue,
        },
      },
    });
  };

  return (
    <>
      {languages.map((language) => (
        <div className="input-group">
          <span className="input-group-addon">
            <img
              src={`language/${language.code}/${language.code}.png`}
              alt={language.name}
            />
          </span>
          <input
            {...props}
            value={value[language.language_id]}
            onChange={(e) => handleChange(language.language_id, e)}
          />
        </div>
      ))}
    </>
  );
}
