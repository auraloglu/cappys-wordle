import React from "react";
import Letter from "../letter/Letter";

import "./word.scss";

const Word = (props) => {
  const renderWord = () => {
    return props.word.map((letter, i) => {
      return <Letter letter={letter} key={i} />;
    });
  };

  return renderWord();
};

export default Word;
