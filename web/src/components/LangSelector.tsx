import { createSignal, For, Show } from "solid-js";
import { currentLanguage, handleSetCurrentLanguage, languages } from "../store/localization";

export const LangSelector = () => {
  const [showLangSelector, setShowLangSelector] = createSignal(false);

  return (
    <div class="lang__selector">
      <button
        onClick={() => {
          setShowLangSelector(!showLangSelector);
        }}
      >
        <img src={"/img/globe.svg"} />

        {currentLanguage().toUpperCase()}
      </button>

      <Show when={showLangSelector()} fallback={<div>Loading...</div>}>
        <For each={languages} fallback={<div>Loading...</div>}>
          {(lang: any) => (
            <button
              onClick={() => {
                handleSetCurrentLanguage(lang);
                setShowLangSelector(false);
              }}
            >
              {lang.toUpperCase()}
            </button>
          )}
        </For>
      </Show>
    </div>
  );
};
