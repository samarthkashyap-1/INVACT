import React,{useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMovieAction } from '../store/slice/moviesSlice';


const MovieFullPageCard = ({ movie, onClick }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const handleDelete = () => {
        const check = confirm("Are you sure you want to delete this movie?");

        if (!check) {
            return;
        }


        dispatch(deleteMovieAction(movie.id)).then(() => {
            alert("Movie Deleted Successfully");
            onClick();
         
        });
        
        
    }
    const user = useSelector((state) => state.auth.user);
    useEffect(() => {
      if (!user) {
          navigate('/login');
      }
      }, [user, navigate]);

  return (
    <div className="w-full h-screen bg-black bg-opacity-25 flex flex-col items-center justify-center p-8">
      <div className="bg-black bg-opacity-70 p-10 rounded-lg text-white max-w-2xl w-full flex sm:flex-col">
        <div className="w-3/4 pr-8 sm:pr-0 sm:w-full">
          <h2 className="text-4xl font-bold mb-4">{movie.title}</h2>
          <p className="mb-4 text-lg">{movie.description}</p>
          <p className="mb-2 text-lg"><strong>Release Year:</strong> {movie.releaseYear}</p>
          <p className="mb-2 text-lg"><strong>Genre:</strong> {movie.genre}</p>
          <p className="mb-2 text-lg"><strong>Watched:</strong> {movie.watched ? 'Yes' : 'No'}</p>
        </div>
        <div className="w-1/4 pl-8 border-l border-gray-600 sm:border-t sm:w-full sm:pt-2 sm:pl-0 sm:border-l-0">
          <p className="mb-2 text-lg"><strong>Rating:</strong> {movie.rating}/5</p>
          <p className="mb-2 text-lg"><strong>Review:</strong> {`${movie.review ? movie.review : "No Reviews"}` }</p>
        </div>

        <button
          onClick={onClick}
          className="absolute top-4 right-4 text-white bg-[#DDA6FF] px-3 py-1 rounded-md hover:bg-[#B153E0]"
        >
          Close
        </button>
      </div>
      <div className='flex gap-5 justify-center mt-5'>
<Link to=
{`/updatemovie/${movie.id}`} className='text-white bg-[#DDA6FF] px-3 py-1 rounded-md hover:bg-[#B153E0]'>Edit</Link>
<Link to='/watchlist' onClick={()=>{
    handleDelete()
}} className='text-white bg-[#DDA6FF] px-3 py-1 rounded-md hover:bg-[#B153E0]'>Delete</Link>
</div>

    </div>
  );
};

export default MovieFullPageCard;
