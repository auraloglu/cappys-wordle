import { configureStore } from "@reduxjs/toolkit";
import wordReducer from "./word/wordSlice";

export const store = configureStore({
  reducer: {
    word: wordReducer,
  },
});
