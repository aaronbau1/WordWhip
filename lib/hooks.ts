import { validFiveLetterWords } from "./data";

export const getRandomLetter = ():string => {
  // ASCII codes for capital letters range from 65 to 90
  const randomCharCode = Math.floor(Math.random() * (90 - 65 + 1)) + 65;
  const randomCapitalLetter = String.fromCharCode(randomCharCode);
  return randomCapitalLetter;
}

export const getRandomWord = (): string => {
  let array = validFiveLetterWords;
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

export const getRandomLine = (wordLength: number, gameBoardLines:number[][]): number[] => {
  const randomIndex = Math.floor(Math.random() * gameBoardLines.length);
  return gameBoardLines[randomIndex].slice();
}

export const getRandomIndex = (array: string[]): number => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return randomIndex;
}





