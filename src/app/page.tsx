"use client"

import { Button } from "@/components/ui/button";
import { AppDispatch } from "@/lib/store";
import { Search } from "lucide-react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { openInfoModal } from "@/lib/features/settings-slice";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 py-8 bg-gradient-to-br from-red-700 to-yellow-400 m-0 overflow-hidden">
      <Search className="h-16 w-16" />
      <h1 className="mt-4 text-5xl font-bold">WordWhip</h1>
      <p className="mt-2 text-2xl text-center font-semibold">Can you find the 5 letter word using your tile?</p>
      <div className="mt-8 flex space-x-4">
        <Link href='/play'>
          <Button variant="outline" onClick={() => dispatch(openInfoModal())}>How to play</Button>
        </Link>
        <Link href='/play'>
          <Button>Play</Button>
        </Link>
      </div>   
    </div>
  )
}


export default Home
