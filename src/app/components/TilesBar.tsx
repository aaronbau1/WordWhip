"use client"

// interface 

const TilesBar = ({handleOnDrag}) => {
  return (
    <div className="flex flex-col items-center justify-center pt-10">
      <div className='flex h-14 w-14 border-2 border-black items-center justify-center bg-gray-300 text-2xl font-bold text-gray-700 cursor-pointer'
        draggable
        onDragStart={(e) => handleOnDrag(e, 'A')}
      >
        A
      </div>
    </div>
  )
}

export default TilesBar