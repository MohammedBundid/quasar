"use client"

import Image from "next/image"
import Link from "next/link"
import SearchModal from "./SearchModal"
import { useState } from "react";

const Navbar = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('')

    const openModal = () => setIsModalVisible(true);
    const closeModal = () => setIsModalVisible(false);

  return (
    <div className="w-full bg-background-800 p-2 flex justify-between items-center">
        <Link href={'/'}>
            <Image
                src={'/logo-highres.png'}
                alt="Quasar logo"
                width={100}
                height={100}
                className="w-auto h-auto"
            />
        </Link>


            <div className="w-1/4 flex items-center justify-between gap-6 mr-6">
                <input 
                    type="search" 
                    name="" 
                    id="" 
                    placeholder="search for movies"
                    className="relative w-full px-4 py-1 rounded-full outline-none focus:ring-4 ring-accent-500 duration-200"
                    onInput={openModal}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <SearchModal isVisible={isModalVisible} searchTerm={searchTerm} onClose={closeModal} />
            </div>

            <nav className="flex justify-between gap-6 items-center text-text-50">
                <Link href={'/movies'} className="hover:text-accent-500 focus:ring-4 ring-accent-500 duration-200 py-1 px-2 rounded-md outline-none">movies</Link>
                <Link href={'/shows'} className="hover:text-accent-500 focus:ring-4 ring-accent-500 duration-200 py-1 px-2 rounded-md outline-none">shows</Link>
                <Link href={'/explore'} className="hover:text-accent-500 focus:ring-4 ring-accent-500 duration-200 py-1 px-2 rounded-md outline-none">explore</Link>
                <Link href={'/watchlist'} className="hover:text-accent-500 focus:ring-4 ring-accent-500 duration-200 py-1 px-2 rounded-md outline-none">watchlist</Link>
            </nav>
    </div>
  )
}

export default Navbar