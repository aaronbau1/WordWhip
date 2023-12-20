interface GameTileProps {
  row: number,
  col: number,
}

const GameTile = ({row, col}: GameTileProps) => {
  return (
    <div className="w-16 h-16 bg-white border-black-200">
      {[row, col]}
    </div>
  )
}

export default GameTile