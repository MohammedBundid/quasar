import Row from '@/components/Row'
import { fetchMoviesTrending } from '@/utils/fetchMovies'
import React from 'react'

const page = async () => {
  const movies = await fetchMoviesTrending()
  return (
    <div className="w-full min-h-full overflow-auto scrollbar-hide"> 
        <Row />
    </div>
  )
}

export default page