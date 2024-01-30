'use client'

import { useEffect, useReducer, useState } from "react";
import GameBoardCell from "./GameBoardCell"
import trie from "../../../lib/utils/Trie";
import TilesBar from "./TilesBar";
import { getRandomLetter, getRandomIndex, getRandomLine, getRandomWord } from "../../../lib/hooks";
import LevelDashboard from "./LevelDashboard";
import { connect, useDispatch } from "react-redux";
import { AppDispatch, RootState, useAppSelector } from "@/lib/store";
import { addLoss, addWin, clearWinsLosses, openGameOverModal, openLevelUpModal, resetGameState } from "@/lib/features/gameState-slice";
import { delay } from "@/lib/utils";
import LevelUpModal from "./LevelUpModal";
import { addLevel, gameOverPhaseEnd, levelUpPhaseEnd, levelUpPhaseStart, resetLevelState } from "@/lib/features/levelState-slice";
import GameOverModal from "./GameOverModal";

interface GameBoardProps {
  levelUpPhase: boolean;
  gameBoardLines: number[][];
  gameOverPhase: boolean;
}

const GameBoard = ({ levelUpPhase, gameBoardLines, gameOverPhase }:GameBoardProps) => {

  const dispatch = useDispatch<AppDispatch>();
  const wins = useAppSelector((state) => state.gameState.value.wins);
  const losses = useAppSelector((state) => state.gameState.value.losses);
  const columns = useAppSelector((state) => state.levelState.value.columns);
  const rows = useAppSelector((state) => state.levelState.value.rows);
  const wordLength = useAppSelector((state) => state.levelState.value.wordLength);
  const tiles = useAppSelector((state) => state.levelState.value.tiles);
  
  const [highlightedCell, setHighlightedCell] = useState<number | null>(null);
  const [boardValues, setBoardValues] = useState<string[]>(Array(rows*columns).fill(''));
  const [tileValues, setTileValues] = useState<string[]>([]);
  const [cellMatches, setCellMatches] = useState<boolean[]>(Array(rows*columns).fill(false));
  const [isInitializing, setIsInitializing] = useState(true);
  const [turnOver, setTurnOver] = useState(false);
  const [puzzleLine, setPuzzleLine] = useState<number[]>([50, 50, 50]);
  const [isWin, setIsWin] = useState(false);

  useEffect(() => {
    if (turnOver) {
      checkForWin();
    }
  }, [turnOver])

  useEffect(() => {
    if (gameOverPhase) {
      dispatch(resetGameState());
      dispatch(resetLevelState());
      dispatch(gameOverPhaseEnd());
    }
  }, [gameOverPhase])

  useEffect(() => {
    if (levelUpPhase) {
      cleanUp();
      dispatch(clearWinsLosses());
      dispatch(levelUpPhaseEnd());
    }
  }, [levelUpPhase])

  useEffect(() => {
    if (isInitializing) {
      initializeGame();
      setIsInitializing(false);
    }
  }, [isInitializing, boardValues, gameBoardLines])

  const initializeGame = () => {
    const {solution, randomIndex, puzzleBoard, solutionLine} = createAPuzzle();
    setBoardValues(puzzleBoard);
    let arr = Array(tiles).fill(getRandomLetter())
    arr[getRandomIndex(arr)] = solution[randomIndex];
    setTileValues(arr);
    setCellMatches(Array(rows*columns).fill(false));
  }

  const createAPuzzle = () => {
    const solution = getRandomWord();
    const solutionLine = getRandomLine(wordLength, gameBoardLines);
    const randomIndex = getRandomIndex(solution.split(''));
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
    return {solution, randomIndex, puzzleBoard, solutionLine}
  }

  const checkBoard = (boardArray:string[]): {word:string[], line:number[]} => {
    const wordsArray = linesToWords(boardArray);
    const solution = wordsArray.filter((word) => trie.search(word));
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
        dispatch(openLevelUpModal());
      } else if (losses >= 2) {
        dispatch(openGameOverModal());
      }
      cleanUp()
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
      <GameOverModal />
      <LevelUpModal />
      <LevelDashboard />
      <div className='flex flex-col max-h-screen'>
        <div className="flex justify-center mt-2">
          <div className='h-[50vw] w-[50vw] md:w-[364px] md:h-[364px] max-h-screen aspect-square relative'>
            <div className='grid absolute inset-0 grid-cols-5 gap-0.5 p-1 rounded-md'
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
        <div className='mt-4'>
          <TilesBar tileValues={tileValues}/>
        </div>
      </div>
    </>
  )
}

const mapStateToProps = (state: RootState): GameBoardProps => ({
  levelUpPhase: state.levelState.value.levelUpPhase,
  gameBoardLines: state.levelState.value.gameBoardLines,
  gameOverPhase: state.levelState.value.gameOverPhase,

});

export default connect(mapStateToProps)(GameBoard)
