import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import Link from "next/link";

const Home = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 py-8">
      <Search className="h-16 w-16" />
      <h1 className="mt-4 text-5xl font-bold">WordWhip</h1>
      <p className="mt-2 text-2xl text-center">Can you find the 5 letter word using your tile?</p>
      <div className="mt-8 flex space-x-4">
        {/* <Button variant="outline">How to play</Button> */}
        {/* <Button variant="outline">Log in</Button> */}
        <Link href='/play'>
          <Button>Play</Button>
        </Link>
      </div>   
    </div>
  )
}


export default Home
