import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerAction } from '../store/slice/RegisterSlice';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    dispatch(registerAction({ name, email, password })).then(() => {
      setLoading(false);
      alert('Registration Successful!');
      navigate('/login')
    });
    setName('');
    setEmail('');
    setPassword('');

  
  };

  return (
    <div className="flex justify-center items-center h-screen w-1/4 sm:w-3/4">
      <form className="bg-black bg-opacity-60 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 w-full " onSubmit={handleSubmit}>
        <div className="mb-4">
        <p className='text-3xl text-center font-bold mb-4 text-white'>Register</p>
          <label className="block text-white text-sm font-bold mb-2" htmlFor="Name">
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="Name"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="email">
            Email Address
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email Address"
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
            Register
          </button>
        </div>
      <p className='text-white mt-5'>Already Registerd ? <Link className='text-blue-500 ' to='/login'>Login</Link></p>

      </form>
    </div>
  );
};

export default Register;
