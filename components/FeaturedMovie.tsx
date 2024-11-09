import Image from "next/image";
import FeaturedSkeleton from "./FeaturedSkeleton";

const FeaturedMovie = ({ movie }) => {
  if (!movie) return <FeaturedSkeleton />;

  return (
    <div className="w-full h-full bg-secondary-500  relative overflow-hidden scrollbar-hide">
      {/* Image Container */}
      <div
        className="w-full h-full bg-cover bg-center bg-red-700"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.poster_path})`,
        }}
      >
        {/* Overlay Gradient */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-background-950 to-gray-900/30"></div>
      </div>

      {/* Movie Details */}
      <div className="absolute bottom-1/4 top-0 right-0 inset-0 z-10 flex flex-col gap-4 justify-end p-8  text-text-50 w-1/2">
        <h1 className="font-sans font-bold text-5xl">
          {movie.title || movie.name}
        </h1>
        <p className="leading-8 font-mono first-letter:capitalize text-ellipsis overflow-hidden">
          {movie.overview}
        </p>
      </div>
    </div>
  );
};

export default FeaturedMovie;



{/* <Image
          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
          alt={movie.title || movie.name}
          fill={true}
          className="object-cover"
          priority={true} // Optional: Prioritize loading for UX
        /> */}
        {/* Overlay Gradient */}