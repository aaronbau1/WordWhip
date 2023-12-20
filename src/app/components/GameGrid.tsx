import GameTile from "./GameTile"

const GameGrid = () => {
  return (
    <div className=" flex justify-center mt-5">
      <div className="grid grid-cols-5 gap-2 border-2">
        {new Array(5).fill(0).map((_, i) => {
          
          return (
            <>
              <GameTile row={i} col={0}/>
              {/* <div key={`${i}`+ '0'} className="w-16 h-16 bg-white border-black-200">
                {`0${i}`}
              </div>
              <div key={`${i}`+ '1'} className="w-16 h-16 bg-white border-black-200">
              </div>
              <div key={`${i}`+ '2'} className="w-16 h-16 bg-white border-black-200">
              </div>
              <div key={`${i}`+ '3'} className="w-16 h-16 bg-white border-black-200">
              </div>
              <div key={`${i}`+ '4'} className="w-16 h-16 bg-white border-black-200">
              </div> */}
            </>
          )
        })}
      </div>
    </div>
  )
}

export default GameGrid