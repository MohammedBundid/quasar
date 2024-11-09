"use client"

import { addToWatchlist, checkWatchlist, removeFromWatchlist } from "@/lib/appwrite/config"
import { useEffect, useMemo, useState } from "react"
import { RiBookmarkFill, RiBookmarkLine } from "react-icons/ri"
import Alert from "./Alert"

// movieId in its raw is an interger type
const Bookmark = ({ movieId }) => {
    const [save, setSave] = useState(false)
    const bookmarkArray = []
    bookmarkArray.push(movieId)

    useEffect(() => {
      const checkIsBookmarked = async () => {
        try {
          const isBookmarked = await checkWatchlist(movieId)
          if(isBookmarked) setSave(true)
        } catch (error) {
          console.error('Error! checking watchlist ', error.message)
        }
      }

      checkIsBookmarked()
    },[movieId])

    const handleBookmark = async () => {
      try {
        if (save) {
          await removeFromWatchlist(movieId); // Handle unbookmarking
        } else {
          await addToWatchlist(bookmarkArray); // Handle bookmarking
        }
        setSave((prev) => !prev);  // Toggle state locally
      } catch (error) {
        console.error("Error updating bookmark status:", error.message);
        console.log(typeof movieId)
      }
    };

    const Icon = useMemo(() => (save ? RiBookmarkFill : RiBookmarkLine), [save]);


  return (
    <div className="absolute top-0 right-0 flex justify-between w-full">
        {/* <Alert type={'error'} message={'added to watchlist'} /> */}
        <Icon className="text-text-50 hover:animate-pulse" size={28} onClick={handleBookmark}/>
    </div>
  )
}

export default Bookmark