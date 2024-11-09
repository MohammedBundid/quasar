import Image from 'next/image';
import React from 'react'
import Bookmark from './Bookmark';
import { RiPlayCircleFill } from 'react-icons/ri';

interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
  }

  interface MovieProps {
    movie: Movie
  }

const Movie:React.FC<MovieProps> = ({ movie }) => {
  return (
    <div className="min-w-32 sm:min-w-60 w-full min-h-72 h-full relative">
        <div className="absolute w-full h-full bg-background-950 opacity-0 hover:opacity-80 flex flex-col justify-center items-center duration-300">
            <RiPlayCircleFill className='text-text-500 hover:cursor-pointer hover:text-text-300 duration-300' size={64}/>

            <p className='text-text-50 font-mono font-medium hover:cursor-pointer text-balance text-center'>{movie.title}</p>
            <Bookmark movieId={movie.id} />

        </div>
        <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            width={500}
            height={72}
            className='rounded-md'
        />
    </div>
  )
}

export default Movie