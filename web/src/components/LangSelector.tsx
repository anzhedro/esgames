import { createSignal, For, Show } from 'solid-js';
import { currentLanguage, handleSetCurrentLanguage, languages } from '../store/localization';
import { Spinner } from './Spinner';

export const LangSelector = () => {
  const [showLangSelector, setShowLangSelector] = createSignal(false);

  return (
    <div class="lang__selector">
      <button
        onClick={() => {
          setShowLangSelector(!showLangSelector);
        }}
      >
        <img src={'/img/globe.svg'} />

        {currentLanguage().toUpperCase()}
      </button>

      <Show when={showLangSelector()} fallback={<Spinner />}>
        <For each={languages} fallback={<Spinner />}>
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
