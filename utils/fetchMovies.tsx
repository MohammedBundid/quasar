interface ParamType {
  param: string,
  page: number
}

export async function fetchMovies({ param, page = 1 }: ParamType) {
  console.log(param)
  let response;
  try {
      switch (param) {
          case 'popular':
              response = await fetch(
                  `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&page=${page}`
              );
              break;
          case 'trending':
              response = await fetch(
                  `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&page=${page}`
              );
              break;
          case 'upcoming':
              response = await fetch(
                  `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&page=${page}`
              );
              break;
          case 'top rated':
              response = await fetch(
                  `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&page=${page}`
              );
              break;
          default:
              throw new Error('Invalid or missing parameter');
      }

      if (!response.ok) {
          throw new Error(`Failed to fetch movies: ${response.statusText}`);
      }

      const data = await response.json();
      return data.results;
  } catch (error) {
      console.error("Failed to fetch movies:", error);
      return [];
  }
}


export async function fetchMoviesTrending() {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
      );
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      const data = await response.json();
  
      return data.results;
    } catch (error) {
      console.error("Failed to fetch trending movies:", error);
      return [];
    }
  }
  