
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { loginUser } from '../../api';


export const loginAction = createAsyncThunk('/Login', async (userData) => {
  const response = await loginUser(userData);
  localStorage.setItem('CineTracker', JSON.stringify(response));
  return response;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: localStorage.getItem('CineTracker')
      ? JSON.parse(localStorage.getItem('CineTracker')).user
      : null,
    status: 'idle',
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('CineTracker');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAction.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
      })
      .addCase(loginAction.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
