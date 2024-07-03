import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MovieCard from "./MovieCard";
import MovieFullPageCard from "./MovieFullPageCard";
import { fetchMovies } from "../store/slice/moviesSlice";
import { Link, useNavigate } from "react-router-dom";

const MyList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const moviesPerPage = 3;

  useEffect(() => {
    if (user) {
      dispatch(fetchMovies()).then(() => {
        console.log("Movies fetched successfully");
      });
    } else {
      navigate("/login");
    }
  }, [dispatch]);

  const movies = useSelector((state) => state.movies.movies);
  console.log(movies);

  const loading = useSelector((state) => state.movies.loading);
  const error = useSelector((state) => state.movies.error);

  // Calculate the movies to display on the current page
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  // Calculate the total number of pages
  const totalPages = Math.ceil(movies.length / moviesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const openModal = (movie) => {
    setSelectedMovie(movie);
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="min-h-screen flex flex-col px-20 w-screen sm:px-5">
      <div className="flex justify-between">
        <p className="text-5xl text-white font-semibold mt-36 sm:text-3xl">
          My WatchList
        </p>
        <Link
          to="/addmovie"
          className="bg-[#DDA6FF] text-white h-fit mt-36 w-fit px-4 py-2 rounded-md  hover:bg-[#B153E0]"
        >
          Add Movie
        </Link>
      </div>

      <div className="flex gap-10 justify-center mt-5 md:flex-col md:gap-3">
        {loading && <p className="text-white text-2xl">Loading...</p>}
        {error && <p className="text-white text-2xl">An error occurred</p>}
        {!loading && !error && (
          <>
            {currentMovies.length > 0 ? (
              currentMovies.map((movie, index) => (
                <div key={index} onClick={() => openModal(movie)}>
                  <MovieCard movie={movie} />
                </div>
              ))
            ) : (
              <div className="text-white text-2xl">No Movies found</div>
            )}
          </>
        )}
      </div>
      <div className="flex justify-center mt-auto mb-6">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`mx-1 px-3 py-1 rounded ${
              currentPage === index + 1
                ? "bg-[#DDA6FF] text-white"
                : "bg-gray-300 text-black"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Modal */}
      {selectedMovie && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-80 flex items-center justify-center z-50">
          <MovieFullPageCard movie={selectedMovie} onClick={closeModal} />
        </div>
      )}
    </div>
  );
};

export default MyList;
