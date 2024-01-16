import { useEffect, useState } from "react";
import GameBoardCell from "./GameBoardCell"
import trie from "../../../lib/utils/Trie";
import { gameBoardLines } from "../../../lib/data";
import TilesBar from "./TilesBar";
import { createSolutionLine, getRandomCapitalLetter, getRandomIndex, getRandomLine, getRandomWord } from "../../../lib/hooks";

const GameBoard = () => {

  const [highlightedCell, setHighlightedCell] = useState<number | null>(null);
  const [boardValues, setBoardValues] = useState<string[]>(Array(25).fill(''));
  const [tileValues, setTileValues] = useState<string[]>([]);

  //initialize the puzzle
  //BUG FOUND: IF BOTH ARE SAME LETTER, WILL UPDATE WITH ONLY ONE TILE IF PLACED
  useEffect(() => {
    const solution = getRandomWord();
    let solutionLine = getRandomLine();
    const randomIndex = getRandomIndex();
    let randomValues
    // initializeBoardValues(solution, solutionLine, randomIndex);
    do {
      randomValues = boardValues.map((value, index) => {
        if (solutionLine.includes(index) && index !== solutionLine[randomIndex]) {
          return solution[solutionLine.indexOf(index)].toUpperCase();
        } else {
          return getRandomCapitalLetter();
        }
      });
    } while (checkBoard(gameBoardLines, randomValues).length !== 0)
  
    setBoardValues(randomValues);
    setTileValues([solution[randomIndex].toUpperCase()]);
  }, []);

  // Check for matches after the boardValues state has been updated
  useEffect(() => {
    const matchingWords = checkBoard(gameBoardLines, boardValues);
    if (matchingWords.length > 0) {
      alert(`You found the word: ${matchingWords.join(", ")}`);
    }
  }, [boardValues]);

  const checkBoard = (gameBoardLines: number[][], valueArray:string[]): string[] => {
    const wordsArray = linesToWords(gameBoardLines, valueArray);
    return wordsArray.filter((word) => trie.search(word));
  };

  const initializeBoardValues = (solution:any, solutionLine:any, randomIndex:any) => {
    solutionLine.splice(randomIndex,1)
    let randomValues;
    
    do {
      randomValues = boardValues.map((value, index) => {
        if (solutionLine.includes(index)) {
          return solution[solutionLine.indexOf(index)].toUpperCase();
        } else {
          return getRandomCapitalLetter();
        }
      })
    } while (checkBoard(gameBoardLines, randomValues).length !== 0)

    setBoardValues(randomValues);
  };

  const linesToWords = (gameBoardLines: number[][], valueArray:string[]):string[] => {
    return gameBoardLines.map((line) => {
      // GameBoardCell values to word
      return line.map((value) => (valueArray[value]).toLowerCase()).join('');
    })
  }

  const updateTileBar = (droppedTileValue: string) => {
    let temp = tileValues.filter((tile) => tile !== droppedTileValue);
    setTileValues([...temp, getRandomCapitalLetter()]);
  };

  const handleTileDrop = (id: number, value: string) => {
    const updatedValues = [...boardValues];
    updatedValues[id] = value;
    setBoardValues(updatedValues);
    updateTileBar(value);
  };

  const handleDragLeave = () => {
    setHighlightedCell(null);
  };

  return (
    <>
    <div className="flex justify-center mt-2">
      <div className="w-6/12 h-6/12 aspect-square relative">
        <div className="grid absolute inset-0 grid-cols-5 gap-0.5 p-1 rounded-md"
          onDragLeave={handleDragLeave}
        >
          {boardValues.map((value, index) => (
            <GameBoardCell 
              key={index} 
              id={index}
              value={value}
              onDrop={handleTileDrop}
            />
          ))}
        </div>
      </div>
    </div>
    <TilesBar tileValues={tileValues}/>
    </>
  )
}

export default GameBoard