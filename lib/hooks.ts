export const getRandomCapitalLetter = ():string => {
  // ASCII codes for capital letters range from 65 to 90
  const randomCharCode = Math.floor(Math.random() * (90 - 65 + 1)) + 65;
  const randomCapitalLetter = String.fromCharCode(randomCharCode);
  return randomCapitalLetter;
}