interface GameBoardCellProps {
  row: number,
  col: number,
}

const GameBoardCell = ({row, col}: GameBoardCellProps) => {
  return (
    <div></div>
    // <div className="w-16 h-16 bg-white border-black-200 border-5">
    //   {[row, col]}
    // </div>
  )
}

export default GameBoardCell