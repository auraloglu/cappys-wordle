import React from "react";
import { useSelector } from "react-redux";

import Word from "../word/Word";

import "./word-list.scss";

const WordList = () => {
  const wordList = useSelector((state) => state.word.wordList);

  const renderWordList = () => {
    return wordList.map((word, i) => {
      return (
        <div className="word" key={i}>
          <Word word={word} />;
        </div>
      );
    });
  };

  return <div className="game-container">{renderWordList()}</div>;
};

export default WordList;
