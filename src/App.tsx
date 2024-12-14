import { useState } from "react";
import "./App.css";
import BingoList from "./components/BingoList";
import Inputs from "./components/Inputs";
function App() {
  const [numbers, setNumbers] = useState<number[]>([]);
  const [seed, setSeed] = useState<string | number>("");

  return (
    <>
      <Inputs setNumbers={setNumbers} setSeed={setSeed} />
      <BingoList numbers={numbers} seed={seed} />
    </>
  );
}

export default App;
