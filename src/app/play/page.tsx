import GameBoard from "@/components/component/GameBoard"
import NavBar from "@/components/component/NavBar"

const Play = () => {

  return (
    <div className="flex min-h-screen flex-col bg-gray-500 m-0 overflow-hidden">
      <NavBar />
      <GameBoard />
    </div>
  )
}

export default Play
