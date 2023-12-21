import GameBoardCell from "./GameBoardCell"

const GameBoard = ({handleOnDrop, handleDragOver}) => {
  return (
    <div className="flex justify-center mt-5">
      <div className="w-6/12 h-6/12 aspect-square relative">
        <div className="grid absolute inset-0 grid-cols-5 gap-1 p-1 rounded-md"
          onDragOver={handleDragOver}
        >
          {Array.from({ length: 25 }, (_, index) => (
            <GameBoardCell 
              key={index - 1} 
              id={index - 1}
              value={String.fromCharCode(Math.floor(Math.random() * 26) + 65)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default GameBoard