'use client'

import { RiFilter3Line } from "react-icons/ri";
import FilterModal from "./FilterModal";
import Movie from "./Movie";
import { useEffect, useState } from "react";
import { fetchMovies } from "@/utils/fetchMovies";
import Pagination from "./Pagination";

const Row = () => {
  const [visible, setVisible] = useState(false)
  const [movieParam, setMovieParam] = useState('popular')
  const [movies, setMovies] = useState([])
  const [selectedParam, setSelectedParam] = useState('popular'); // Track the active category button
  const [currentPage, setCurrentPage] = useState(1); // Track the current page

  const handleMovieParam = (name: string) => {
    console.log('fetching movies', name)
    setMovieParam(name)
    setSelectedParam(name); // Update active button
    setCurrentPage(1); // Reset to first page on new category selection
  }

  useEffect(() => {
    const fetchMovieByParam = async () => {
      const myMovies = await fetchMovies({ param: movieParam, page: currentPage})
      setMovies(myMovies)
    }

    fetchMovieByParam()
  }, [movieParam, currentPage])

  const handleModal = () => {
    setVisible((prev) => !prev)
    console.log('first')
  }


  return (
    <div className="flex flex-col w-full p-2 relative">
      <div className="p-2 flex justify-between w-full">
        <div className="flex gap-2 px-8">
        {["popular", "trending", "upcoming", "top rated"].map((param) => (
            <button
              key={param}
              className={`text-text-50 capitalize px-4 py-1 rounded-full border border-accent-200 duration-200
              ${selectedParam === param ? 'bg-accent-400' : 'hover:bg-accent-300'}`}
              onClick={() => handleMovieParam(param)}
            >
              {param}
            </button>
          ))}
        </div>
        <RiFilter3Line className='text-accent-500 hover:cursor-pointer z-20' size={32} onClick={handleModal}/>
      </div>

      <Pagination
        totalPages={500}
        currentPage={currentPage}
        onPageChange={(page) => setCurrentPage(page)} // Update page on pagination change
      />

      <div className="w-full min-h-full grid grid-cols-2 lg:grid-cols-3 sm:grid-cols-4 gap-4 overflow-auto scrollbar-hide scroll-smooth p-6">
        {movies.map((movie, index) => (
          <div key={movie.id} className="p-4">
            {/* Render each movie */}
            <Movie movie={movie} />
          </div>
        ))}


      </div>
      <FilterModal visible={visible} />
      {movies && movies.length > 0 && (
        <Pagination
          totalPages={500}
          currentPage={currentPage}
          onPageChange={(page) => setCurrentPage(page)} // Update page on pagination change
        />
      )}
    </div>
  );
};

export default Row;
