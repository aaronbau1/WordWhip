interface GameBoardCellProps {
  id: number,
  key: number,
  value: string,
}

const GameBoardCell = ({key, value}: GameBoardCellProps) => {
  return (
    <div className="bg-gray-300 flex items-center justify-center text-2xl font-bold text-gray-700">
      {value}
    </div>
  )
}

export default GameBoardCell