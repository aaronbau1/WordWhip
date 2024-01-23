import Clock from "@/components/component/Clock"
import GameBoard from "@/components/component/GameBoard"
import NavBar from "@/components/component/NavBar"

const Play = () => {

  return (
    <div className="flex h-screen min-h-screen flex-col bg-gray-500">
      <NavBar />
      <GameBoard />
    </div>
  )
}

export default Play
