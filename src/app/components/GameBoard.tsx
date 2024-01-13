import { useEffect, useState } from "react";
import GameBoardCell from "./GameBoardCell"
import trie from "../../../lib/utils/Trie";
import { gameBoardLines } from "../../../lib/data";
import TilesBar from "./TilesBar";
import { getRandomCapitalLetter } from "../../../lib/hooks";

const GameBoard = () => {

  const [highlightedCell, setHighlightedCell] = useState<number | null>(null);
  const [boardValues, setBoardValues] = useState<string[]>(Array(25).fill('A'));
  const [tileValues, setTileValues] = useState<string[]>([]);

  useEffect(() => {
    setTileValues([getRandomCapitalLetter(), getRandomCapitalLetter()]);
  }, []);

  const handleDragLeave = () => {
    setHighlightedCell(null);
  };

  const linesToWords = (gameBoardLines: number[][]):string[] => {
    return gameBoardLines.map((line) => {
      return line.map((id) => (boardValues[id]).toLowerCase).join('');
    })
  }

  const updateTileBar = (droppedTileValue: string) => {
    let temp = tileValues.filter((tile) => tile !== droppedTileValue);
    // Update the tileValues state in the TileBar component
    setTileValues([...temp, getRandomCapitalLetter()]);
  };

  const handleTileDrop = (id: number, value: string) => {
    const updatedValues = [...boardValues];
    updatedValues[id] = value;
    setBoardValues(updatedValues);
    updateTileBar(value);
    // Check a diagonal, vertical, or row for matching words
    let wordsArray = linesToWords(gameBoardLines)
    const findMatch = wordsArray.filter((word) => {
      return trie.search(word);
    })
    if (findMatch[0]) alert(`You found the word: ${findMatch[0]}`)
  };

  return (
    <>
    <div className="flex justify-center mt-5">
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