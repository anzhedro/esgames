import { AliasRules } from "./AliasRules";

export const GameRules = (props: { setMode: (str: string) => void }) => {
  return (
    <>
      <div class="header" style={{ justifyContent: "space-around" }}>
        <button onClick={() => props.setMode("rules")}>ПРАВИЛА</button>
        <button onClick={() => props.setMode("settings")}>НАСТРОЙКИ</button>
      </div>
      <div class="content game_rules">
        <AliasRules />
      </div>
      <div class="footer">
        <button onClick={() => props.setMode("select")}>НАЗАД</button>
        <button onClick={() => props.setMode("play")}>НАЧАТЬ</button>
      </div>
    </>
  );
};
