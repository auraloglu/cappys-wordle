import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  enterLetter,
  deleteLetter,
  checkWord,
} from "../../store/word/wordSlice";
import dictionary from "../../common/constants/dictionary";

import "./keyboard.scss";

const keyboardList = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "DEL"],
];

const Keyboard = () => {
  const dispatch = useDispatch();

  const correctlyPlacedLetters = useSelector(
    (state) => state.word.correctlyPlacedLetters
  );
  const wronglyPlacedLetters = useSelector(
    (state) => state.word.wronglyPlacedLetters
  );
  const wrongLetters = useSelector((state) => state.word.wrongLetters);
  const currentLetter = useSelector((state) => state.word.currentLetter);
  const currentRow = useSelector((state) => state.word.currentRow);
  const wordList = useSelector((state) => state.word.wordList);

  const handleLetterClick = (letter) => {
    if (currentLetter < 5 && letter !== "ENTER" && letter !== "DEL") {
      dispatch(enterLetter(letter));
    } else if (letter === "DEL" && currentLetter >= 0) {
      dispatch(deleteLetter());
    } else if (currentLetter === 5 && letter === "ENTER") {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    let counter = 0;

    let answer = "";

    wordList[currentRow].forEach((letter) => {
      if (letter !== "") {
        answer = answer + letter.value;
        counter++;
      }
    });

    let isWordFiveLetter = counter === 5;

    if (
      isWordFiveLetter &&
      dictionary.some((word) => word === answer.toLowerCase())
    ) {
      dispatch(checkWord());
    }
  };

  const renderKeyboard = () => {
    return (
      <div className="keyboard">
        {keyboardList.map((row, i) => {
          return (
            <div className="keyboard-row" key={`keyboard-row-${i}`}>
              {row.map((letter) => {
                return (
                  <div
                    className={`keyboard-letter keyboard-letter-${letter} ${
                      correctlyPlacedLetters.indexOf(letter) > -1
                        ? "correct-place-and-letter"
                        : wronglyPlacedLetters.indexOf(letter) > -1
                        ? "correct-letter"
                        : wrongLetters.indexOf(letter) > -1
                        ? "wrong-letter"
                        : ""
                    }`}
                    onClick={() => handleLetterClick(letter)}
                    key={`keyboard-letter-${letter}`}
                  >
                    {letter}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  };

  return renderKeyboard();
};

export default Keyboard;
