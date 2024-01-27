'use client'

import { useEffect, useState } from "react";
import GameBoardCell from "./GameBoardCell"
import trie from "../../../lib/utils/Trie";
import { gameBoardLines } from "../../../lib/data";
import TilesBar from "./TilesBar";
import { getRandomLetter, getRandomIndex, getRandomLine, getRandomWord } from "../../../lib/hooks";
import LevelDashboard from "./LevelDashboard";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/lib/store";
import { addLoss, addWin, addLevel, openLevelUpModal } from "@/lib/features/gameState-slice";
import { delay } from "@/lib/utils";
import { Button } from "../ui/button";
import { LevelUpModal } from "./LevelUpModal";

const GameBoard = () => {

  const [highlightedCell, setHighlightedCell] = useState<number | null>(null);
  const [boardValues, setBoardValues] = useState<string[]>(Array(25).fill(''));
  const [tileValues, setTileValues] = useState<string[]>([]);
  const [cellMatches, setCellMatches] = useState<boolean[]>(Array(25).fill(false));
  const [isInitializing, setIsInitializing] = useState(true);
  const [turnOver, setTurnOver] = useState(false);
  const [puzzleLine, setPuzzleLine] = useState<number[]>([50, 50, 50, 50, 50]);
  const [isWin, setIsWin] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const wins = useAppSelector((state) => state.gameState.value.wins);
  const losses = useAppSelector((state) => state.gameState.value.losses);
  const level = useAppSelector((state) => state.gameState.value.level);

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

    setPuzzleLine(solutionLine);
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
      dispatch(addWin());
      setCellMatches(cellMatches.map((_, index) => matchingWordObj.line.includes(index)));
      setIsWin(true);
    } else {
      dispatch(addLoss());
      setCellMatches(cellMatches.map((_, index) => puzzleLine.includes(index)));
    }
    //delay to let animation play out
    delay(1250).then(() => {
      // level is added after render so win or loss always lags one behind
      if (wins >= 2 ) {
        dispatch(addLevel());
      } else if (losses >= 2) {
        alert('u lose, play again?');
      }
      dispatch(openLevelUpModal())
      cleanUp();
    })
  } 

  const cleanUp = () => {
    setIsInitializing(true);
    setTurnOver(false);
    setIsWin(false);
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
      <LevelUpModal />
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
                isWin={isWin}
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