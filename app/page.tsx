import FeaturedMovie from "@/components/FeaturedMovie";
import {fetchMovies} from "@/utils/fetchMovies";

export default async function Home() {
  const myMovies = await fetchMovies();
  // console.log(myMovies)

  const randomMovie = myMovies
  ? myMovies[Math.floor(Math.random() * myMovies.length)]
  : null;

  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* null for testing */}
      <FeaturedMovie movie={randomMovie} />
    </div>
  );
}
