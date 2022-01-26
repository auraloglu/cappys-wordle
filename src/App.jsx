import React, { useEffect } from "react";
import Counter from "./components/counter/Counter";
import Keyboard from "./components/keyboard/Keyboard";
import WordList from "./components/wordList/WordList";
import { useDispatch, useSelector } from "react-redux";
import { updateWord } from "./store/word/wordSlice";

import generatedWord from "./common/utils/generateWord";
import "./App.scss";

const App = () => {
  const dispatch = useDispatch();

  const answer = useSelector((state) => state.word.correctWord);
  const currentRow = useSelector((state) => state.word.currentRow);

  useEffect(() => {
    dispatch(updateWord(generatedWord));
  }, []);

  return (
    <div className="cappys-wordle-game">
      <Counter />
      {currentRow > 5 && <div className="answer">{answer}</div>}
      <WordList />
      <Keyboard />
    </div>
  );
};

export default App;
