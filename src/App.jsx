import React, { useState, useEffect } from "react";

import "./App.css";

const App = () => {
  const [wordList, setWordList] = useState([]);
  const [currentRow, setCurrentRow] = useState(0);
  const [currentLetter, setCurrentLetter] = useState(0);

  const keyboardList = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "DEL"],
  ];

  const correctWord = "DREAM";

  useEffect(() => {
    renderWordSquares();
  }, []);

  const renderWordSquares = () => {
    let squaresArr = [];
    for (var i = 0; i < 6; i++) {
      squaresArr.push([]);
      for (var j = 0; j < 5; j++) {
        squaresArr[i].push({
          letter: "",
          status: 0,
        });
      }
    }

    setWordList(squaresArr);
  };

  const handleLetterClick = (letter) => {
    if (currentLetter < 5 && letter !== "ENTER" && letter !== "DEL") {
      wordList[currentRow][currentLetter].letter = letter;
      setCurrentLetter(currentLetter + 1);
    } else if (letter === "DEL" && currentLetter >= 0) {
      wordList[currentRow][currentLetter - 1].letter = "";
      setCurrentLetter(currentLetter - 1);
    } else if (currentLetter === 5 && letter === "ENTER") {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    let counter = 0;

    wordList[currentRow].forEach((letter) => {
      if (letter !== "") {
        counter++;
      }
    });

    let isWordFiveLetter = counter === 5;

    if (isWordFiveLetter) {
      for (let i = 0; i < 5; i++) {
        if (wordList[currentRow][i].letter === correctWord.split("")[i]) {
          wordList[currentRow][i].status = 3;
        } else if (
          correctWord
            .split("")
            .some((letter) => letter === wordList[currentRow][i].letter)
        ) {
          wordList[currentRow][i].status = 2;
        } else {
          wordList[currentRow][i].status = 1;
        }
      }
      setCurrentRow(currentRow + 1);
      setCurrentLetter(0);
    }
  };

  return (
    <div className="wordle-container">
      <div className="wordle-game">
        {wordList.map((word, i) => {
          return (
            <div className="wordle-row" key={`worlde-row-${i}`}>
              {word.map((letter, j) => {
                return (
                  <div
                    className={`wordle-letter wordle-letter-${letter.status}`}
                    key={`worlde-letter-${j}`}
                  >
                    {letter.letter}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <div className="wordle-keyboard">
        {keyboardList.map((row, i) => {
          return (
            <div className="keyboard-row" key={`keyboard-row-${i}`}>
              {row.map((letter) => {
                return (
                  <div
                    className={`keyboard-letter keyboard-letter-${letter}`}
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
    </div>
  );
};

export default App;
