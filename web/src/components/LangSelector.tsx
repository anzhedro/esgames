import React, { useState } from "react";
import { store } from "../store/store";

export const LangSelector = () => {
  const [showLangSelector, setShowLangSelector] = useState(false);

  return (
    <div className="lang__selector">
      <button
        onClick={() => {
          setShowLangSelector(!showLangSelector);
        }}
      >
        <img src={"/img/globe.svg"} />

        {store.lang.currentLanguage.toUpperCase()}
      </button>

      {showLangSelector
        ? store.lang.languages.map((lang, idx) => (
            <button
              key={idx}
              onClick={() => {
                store.lang.setCurrentLanguage(lang);
                setShowLangSelector(false);
              }}
            >
              {lang.toUpperCase()}
            </button>
          ))
        : false}
    </div>
  );
};
