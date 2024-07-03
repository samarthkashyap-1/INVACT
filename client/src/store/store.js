// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import registerReducer from './slice/RegisterSlice';
import moviesReducer from './slice/moviesSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    register: registerReducer,
    movies: moviesReducer,

  },
});

export default store;
