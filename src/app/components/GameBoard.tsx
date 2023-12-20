import GameBoardCell from "./GameBoardCell"

const GameBoard = () => {
  return (
    // <div className="grid grid-cols-5 gap-2 justify-center mt-5">
    //   <div className="grid grid-rows-5 gap-2 bg-black">
    //     <div><GameBoardCell /></div>
    //     <div><GameBoardCell /></div>
    //     <div><GameBoardCell /></div>
    //     <div><GameBoardCell /></div>
    //     <div><GameBoardCell /></div>
    //   </div>
    // </div>
    <div className="flex justify-center mt-5">
      <div className="w-6/12 h-6/12 aspect-square relative">
        <div className="grid absolute inset-0 grid-cols-5 gap-1 p-1 rounded-md">
          {Array.from({ length: 25 }, (_, index) => (
            <div
              key={index}
              className="bg-gray-300 flex items-center justify-center text-2xl font-bold text-gray-700"
            >
              {String.fromCharCode(Math.floor(65+(90-65)*Math.random()))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default GameBoard