"use client";

import { getCurrentUser } from "@/lib/appwrite/config";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaHome, FaFilm, FaBookmark, FaUser } from "react-icons/fa";
import LoginModal from "./LoginModal";

const Sidebar = () => {
  const [user, setUser] = useState(null)
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const loggedUser = await getCurrentUser()
        setUser(loggedUser)
      } catch (error) {
        console.error('Error! no user session found', error.message)
      }
    }
    fetchUser()
  }, [])


  const navItems = [
    { icon: <FaHome />, label: "Home" },
    { icon: <FaFilm />, label: "Popular" },
    { icon: <FaBookmark />, label: "Watchlist" },
    { icon: <FaUser />, label: "Profile" },
  ];

  return (
    <div className="w-1/4 h-full bg-background-900 text-white flex flex-col p-6 overflow-hidden scrollbar-hide">
      {/* User Profile */}
      {user ? (

        <div className="flex items-center space-x-4 mb-8">
          <div className="w-12 h-12 rounded-full bg-gray-500"></div>
          <div>
            <p className="text-lg font-semibold">{user.name || user.email}</p>
            <p className="text-sm text-gray-400">{user.email}</p>
          </div>
        </div>
      ) : (
        <div className="flex items-center space-x-4 mb-8">
          <div className="w-12 h-12">
            <Image 
              src={'/avatar.png'}
              alt="avatar"
              width={40}
              height={40}
              className="w-full h-full rounded-full"
            />
          </div>
          <button onClick={openModal} className="px-6 py-2 rounded-md bg-primary-500 text-text-50 font-mono capitalize">sign in</button>
          <LoginModal isVisible={isModalVisible} onClose={closeModal} />
        </div>
      )}
      

      {/* Navigation Links */}
      <div className="flex-1">
        <ul className="space-y-6">
          {navItems.map((item, index) => (
            <li key={index} className="flex items-center space-x-4 cursor-pointer hover:text-secondary-500">
              {item.icon}
              <span className="text-lg">{item.label}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer Section */}
      <div className="mt-auto text-sm text-gray-400">
        <p>&copy; 2024 Quasar</p>
        <p>All Rights Reserved</p>
      </div>
    </div>
  );
};

export default Sidebar;
