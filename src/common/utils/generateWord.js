import dictionary from "../constants/dictionary";

const generatedWord =
  dictionary[Math.floor(Math.random() * dictionary.length)].toUpperCase();

export default generatedWord;
