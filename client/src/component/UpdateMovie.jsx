import React, { useState, useLayoutEffect, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovie, updateMovieAction } from '../store/slice/moviesSlice';

const UpdateMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const movie = useSelector((state) => state.movies.movie);

  const [loading, setLoading] = useState(true); // Add a loading state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [genre, setGenre] = useState('');
  const [rating, setRating] = useState('');
  const [review, setReview] = useState('');
  const [watched, setWatched] = useState(false); // Initialize watched state as boolean

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      dispatch(fetchMovie(id)).then(() => {
        setLoading(false); // Set loading to false once the movie data is fetched
      });
    }
  }, [id, user, navigate, dispatch]);

  useLayoutEffect(() => {
    if (movie) {
      setTitle(movie.title);
      setDescription(movie.description);
      setReleaseYear(movie.releaseYear);
      setGenre(movie.genre);
      setRating(movie.rating);
      setReview(movie.review);
      setWatched(movie.watched);
    }
  }, [movie]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedMovie = {
      title,
      description,
      releaseYear,
      genre,
      rating,
      review,
      watched,
    };
    if (rating > 5) {
        alert("Rating must be 5 or less");
        return;
      }

    const data = {
      id,
      updatedMovie,
    };

    dispatch(updateMovieAction(data)).then(() => {
        alert('Movie updated successfully!');
      navigate('/watchlist');
    });
  };

  // Render a loading indicator or blank state while loading
  if (loading) {
    return (
      <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-70 flex items-center justify-center z-50">
        <div className="bg-white bg-opacity-65 p-8 rounded-lg w-full max-w-4xl sm:w-5/6">
          <h2 className="text-2xl font-semibold mb-4">Loading...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white bg-opacity-65 p-8 rounded-lg w-full max-w-4xl sm:w-5/6">
        <h2 className="text-2xl font-semibold mb-4">Update Movie</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Left Section - Movie Details */}
          <div className="w-full">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                id="title"
                type="text"
                className="mt-1 block w-full px-2 py-2 border-gray-300 rounded-md shadow-sm sm:text-sm"
                placeholder="Enter movie title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="mt-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                className="mt-1 block w-full px-2 py-2 border-gray-300 rounded-md shadow-sm sm:text-sm resize-none"
                rows="3"
                placeholder="Enter movie description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="releaseYear" className="block text-sm font-medium text-gray-700">
                  Release Year
                </label>
                <input
                  id="releaseYear"
                  type="number"
                  className="mt-1 block w-full px-2 py-2 border-gray-300 rounded-md shadow-sm sm:text-sm"
                  placeholder="Enter release year"
                  value={releaseYear}
                  onChange={(e) => setReleaseYear(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="genre" className="block text-sm font-medium text-gray-700">
                  Genre
                </label>
                <input
                  id="genre"
                  type="text"
                  className="mt-1 block w-full px-2 py-2 border-gray-300 rounded-md shadow-sm sm:text-sm"
                  placeholder="Enter movie genre"
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                />
              </div>
            </div>
          </div>
          {/* Right Section - Rating, Review, and Watched */}
          <div className="w-full">
            <div>
              <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
                Rating
              </label>
              <input
                id="rating"
                type="number"
                className="mt-1 block w-full px-2 py-2 border-gray-300 rounded-md shadow-sm sm:text-sm"
                placeholder="Enter rating (1-5)"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <label htmlFor="review" className="block text-sm font-medium text-gray-700">
                Review
              </label>
              <textarea
                id="review"
                className="mt-1 block w-full px-2 py-2 border-gray-300 rounded-md shadow-sm sm:text-sm resize-none"
                rows="3"
                placeholder="Enter your review"
                value={review}
                onChange={(e) => setReview(e.target.value)}
              ></textarea>
            </div>
            <div className="mt-4">
              <label htmlFor="watched" className="block text-sm font-medium text-gray-700">
                Watched
              </label>
              <input
                id="watched"
                type="checkbox"
                className="ml-2 form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                checked={watched}
                onChange={(e) => setWatched(e.target.checked)}
              />
            </div>
          </div>
          {/* Button Section */}
          <div className="w-full mt-8 flex justify-end">
            <Link
              to="/watchlist"
              className="mr-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 border border-transparent rounded-md hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-[#DDA6FF] border border-transparent rounded-md hover:bg-[#B153E0] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateMovie;
