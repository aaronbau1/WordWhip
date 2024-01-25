'use client'

import { Settings } from 'lucide-react';
import { Info } from 'lucide-react';
import Link from 'next/link';
import { InfoModal } from './InfoModal';
import { useEffect } from 'react';
import { SettingsModal } from './SettingsModal';

const NavBar = () => {
  return (
    <div className="flex h-14 w-full border-2 border-black items-center justify-between bg-gray-700">
      <SettingsModal />
      <div className="text-4xl md:text-5xl font-bold uppercase text-transparent bg-clip-text bg-gradient-to-br from-red-700 to-yellow-400 top-0">
        <Link href='/'>WordWhip</Link>
      </div>
      <InfoModal />
    </div>
  )
}

export default NavBar