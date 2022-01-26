import { createSlice } from "@reduxjs/toolkit";

const squaresArr = [];
for (var i = 0; i < 6; i++) {
  squaresArr.push([]);
  for (var j = 0; j < 5; j++) {
    squaresArr[i].push({
      value: "",
      status: 0,
    });
  }
}

const initialState = {
  wordList: squaresArr,
  correctWord: null,
  currentRow: 0,
  currentLetter: 0,
  correctlyPlacedLetters: [],
  wronglyPlacedLetters: [],
  wrongLetters: [],
};

export const wordSlice = createSlice({
  name: "word",
  initialState,
  reducers: {
    enterLetter: (state, action) => {
      state.wordList[state.currentRow][state.currentLetter].value =
        action.payload;
      state.currentLetter += 1;
    },
    deleteLetter: (state) => {
      state.wordList[state.currentRow][state.currentLetter - 1].value = "";
      state.currentLetter -= 1;
    },
    checkWord: (state) => {
      for (let i = 0; i < 5; i++) {
        if (
          state.wordList[state.currentRow][i].value ===
          state.correctWord.split("")[i]
        ) {
          state.wordList[state.currentRow][i].status = 3;
          state.correctlyPlacedLetters.push(
            state.wordList[state.currentRow][i].value
          );
        } else if (
          state.correctWord
            .split("")
            .some(
              (letter) => letter === state.wordList[state.currentRow][i].value
            )
        ) {
          state.wordList[state.currentRow][i].status = 2;
          state.wronglyPlacedLetters.push(
            state.wordList[state.currentRow][i].value
          );
        } else {
          state.wordList[state.currentRow][i].status = 1;
          state.wrongLetters.push(state.wordList[state.currentRow][i].value);
        }
      }

      state.currentRow += 1;
      state.currentLetter = 0;
    },
    updateWord: (state, action) => {
      state.correctWord = action.payload;
    },
  },
});

export const { enterLetter, deleteLetter, checkWord, updateWord } =
  wordSlice.actions;

export default wordSlice.reducer;
