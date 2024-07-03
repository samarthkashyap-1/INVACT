import React from 'react';

const MovieCard = ({ movie }) => {
  return (
    <div className="w-80 mx-auto h-[35vh]   sm:h-fit shadow-[#DDA6FF] bg-black   bg-opacity-65 p-4 rounded-lg shadow my-2">
      <h2 className="text-xl font-semibold text-white mb-1">{movie.title}</h2>
      <p className="text-gray-200 mb-2 truncate ">{movie.description}</p>
      <p className="text-gray-200 mb-1"><strong>Release Year:</strong> {movie.releaseYear}</p>
      <p className="text-gray-200 mb-1"><strong>Genre:</strong> {movie.genre}</p>
      <p className="text-gray-200 mb-1 sm:hidden"><strong>Watched:</strong> {movie.watched ? 'Yes' : 'No'}</p>
      <p className="text-gray-200 mb-1 "><strong>Rating:</strong> {movie.rating}/5</p>
      <p className="text-gray-200 mb-1 sm:hidden truncate"><strong>Review:</strong> {`${movie.review ? movie.review : "No Reviews"}` }</p>
    </div>
  );
};

export default MovieCard;
