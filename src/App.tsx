import { useEffect, useState } from "react";
import "./App.css";
import BingoList from "./components/BingoList";
import Inputs from "./components/Inputs";
import BingoSheet from "./components/BingoSheet";
import { createBingo } from "./services/create-bingo";

function App() {
  const [numbers, setNumbers] = useState<number[]>([]);
  const [seed, setSeed] = useState<string | number>("");
  const [isShowText, setIsShowText] = useState(false);
  const [bingoContents, setBingoContents] = useState<Map<number, string>>(
    createBingo(seed)
  );

  useEffect(() => {
    setBingoContents(createBingo(seed));
  }, [seed]);

  return (
    <>
      <BingoSheet bingoContents={bingoContents} isShowText={isShowText} />
      <Inputs
        setNumbers={setNumbers}
        setSeed={setSeed}
        setIsShowText={setIsShowText}
      />
      <BingoList numbers={numbers} bingoContents={bingoContents} />
    </>
  );
}

export default App;
