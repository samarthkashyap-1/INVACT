import React, { useEffect, useState } from 'react';
import { useDispatch , useSelector} from 'react-redux';
import { loginAction } from '../store/slice/authSlice';
import { useNavigate, Link } from 'react-router-dom';


const Login = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();



  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(loginAction({ email, password })).then(() => {
      setLoading(false);
      alert("Login Successful!");

      navigate('/watchlist');
    });
    
    setEmail('');
    setPassword('');
  };

  useEffect(() => {
    if (user) {
      navigate('/watchlist');
    }
  }
  , [navigate]);
  


  return (
    <div className="flex justify-center items-center h-screen w-1/4 sm:w-3/4">
      <form className="bg-black bg-opacity-60 rounded-lg shadow-md px-8 pt-6 pb-8 mb-4 w-full" onSubmit={handleSubmit}>
        <div className="mb-4">
            <p className='text-3xl text-center font-bold mb-4 text-white'>Login</p>
          <label className="block text-white text-sm font-bold mb-2" htmlFor="Email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="Email"
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-[#DDA6FF] hover:bg-[#B153E0] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={loading}
          >
            Sign In
          </button>
        </div>
      <p className='text-white mt-5'>Not Registerd yet ? <Link className='text-blue-500 ' to='/register'>Register</Link></p>
      </form>
    </div>
  );
};

export default Login;
