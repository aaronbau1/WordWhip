'use client'

import { useEffect, useState } from "react";
import GameBoardCell from "./GameBoardCell"
import trie from "../../../lib/utils/Trie";
import { gameBoardLines } from "../../../lib/data";
import TilesBar from "./TilesBar";
import { getRandomLetter, getRandomIndex, getRandomLine, getRandomWord } from "../../../lib/hooks";
import LevelDashboard from "./LevelDashboard";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { addLoss, addWin } from "@/lib/features/gameState-slice";

const GameBoard = () => {

  const [highlightedCell, setHighlightedCell] = useState<number | null>(null);
  const [boardValues, setBoardValues] = useState<string[]>(Array(25).fill(''));
  const [tileValues, setTileValues] = useState<string[]>([]);
  const [cellMatches, setCellMatches] = useState<boolean[]>(Array(25).fill(false));
  const [isInitializing, setIsInitializing] = useState(true);
  const [turnOver, setTurnOver] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (turnOver) {
      checkForWin();
    }
  }, [turnOver])

  useEffect(() => {
    if (isInitializing) {
      initializeGame();
      setIsInitializing(false);
    }
  }, [isInitializing]);

  const initializeGame = () => {
    const {solution, randomIndex, puzzleBoard} = createAPuzzle();
    setBoardValues(puzzleBoard);
    setTileValues([solution[randomIndex]]);
    setCellMatches(Array(25).fill(false));
  }

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

  const checkForWin = () => {
    const matchingWordObj = checkBoard(boardValues);
    if (matchingWordObj.word.length > 0) {
      setCellMatches(cellMatches.map((_, index) => matchingWordObj.line.includes(index)));
      dispatch(addWin());
    } else {
      dispatch(addLoss());
    }
    //let animation play out
    const delay = (ms:number) => new Promise(resolve => setTimeout(resolve, ms));
    delay(1250).then(() => {
      setIsInitializing(true);
      setTurnOver(false);
    })
  } 

  const handleTileDrop = (id: number, value: string) => {
    const updatedValues = [...boardValues];
    updatedValues[id] = value;
    setBoardValues(updatedValues);
    setTurnOver(true);
  };

  const handleDragLeave = () => {
    setHighlightedCell(null);
  };

  return (
    <>
      <LevelDashboard />
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

export default GameBoard;