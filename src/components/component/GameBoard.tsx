'use client'

import { useEffect, useState } from "react";
import GameBoardCell from "./GameBoardCell"
import trie from "../../../lib/utils/Trie";
import { gameBoardLines } from "../../../lib/data";
import TilesBar from "./TilesBar";
import { getRandomLetter, getRandomIndex, getRandomLine, getRandomWord } from "../../../lib/hooks";
import Clock from "./Clock";
import GameState from "./GameState";

const GameBoard = () => {

  const [highlightedCell, setHighlightedCell] = useState<number | null>(null);
  const [boardValues, setBoardValues] = useState<string[]>(Array(25).fill(''));
  const [tileValues, setTileValues] = useState<string[]>([]);
  const [cellMatches, setCellMatches] = useState<boolean[]>(Array(25).fill(false));

  //initialize the puzzle
  //BUG FOUND: IF BOTH ARE SAME LETTER, WILL UPDATE WITH ONLY ONE TILE IF PLACED
  useEffect(() => {
    const {solution, randomIndex, puzzleBoard} = createAPuzzle();
    setBoardValues(puzzleBoard);
    setTileValues([solution[randomIndex]]);
  }, []);

  // Check for matches after placing a tile
  useEffect(() => {
    const matchingWordObj = checkBoard(boardValues);
    if (matchingWordObj.word.length > 0) {
      setCellMatches(cellMatches.map((val, index) => matchingWordObj.line.includes(index)))
    }
  }, [boardValues]);

  const createAPuzzle = () => {
    const solution = getRandomWord();
    const solutionLine = getRandomLine();
    const randomIndex = getRandomIndex();
    let puzzleBoard;
    
    do {
      puzzleBoard = boardValues.map((value, index) => {
        if (solutionLine.includes(index) && index !== solutionLine[randomIndex]) {
          return solution[solutionLine.indexOf(index)];
        } else {
          return getRandomLetter();
        }
      });
    } while (checkBoard(puzzleBoard).word.length !== 0)

    return {solution, randomIndex, puzzleBoard}
  }

  const checkBoard = (boardArray:string[]): {word:string[], line:number[]} => {
    const wordsArray = linesToWords(boardArray);
    const solution = wordsArray.filter((word) => trie.search(word))
    const solutionLine = gameBoardLines.filter((line) => (line.map((value) => (boardValues[value])).join('')) === solution[0])[0]
    return {
      word: solution,
      line: solutionLine
    };
  };

  const linesToWords = (valueArray:string[]):string[] => {
    return gameBoardLines.map((line) => {
      // GameBoardCell values to word
      return line.map((value) => (valueArray[value])).join('');
    })
  }

  const updateTileBar = (droppedTileValue: string) => {
    let temp = tileValues.filter((tile) => tile !== droppedTileValue);
    setTileValues([...temp, getRandomLetter()]);
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
      <GameState />
      <div className="flex justify-center mt-2">
        <div className="w-[50vw] h-[50vw] max-w-screen-md max-h-screen-md aspect-square relative">
          <div className="grid absolute inset-0 grid-cols-5 gap-0.5 p-1 rounded-md"
            onDragLeave={handleDragLeave}
          >
            {boardValues.map((value, index) => (
              <GameBoardCell 
                key={index} 
                id={index}
                value={value}
                onDrop={handleTileDrop}
                isMatched={cellMatches[index]}
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