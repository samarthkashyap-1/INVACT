import { createSlice , createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { registerUser } from '../../api';

export const registerAction = createAsyncThunk('/Register', async (userData) => {
    const response = await registerUser(userData);
    // localStorage.setItem('CineTracker', JSON.stringify(response));
    console.log(response);
    return response;
    });

const RegisterSlice = createSlice({
    name: 'register',
    initialState: {
        status: 'idle',
        error: null,
    },
    reducers: {},
   
    extraReducers: (builder) => {
        builder
            .addCase(registerAction.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(registerAction.fulfilled, (state, action) => {
                state.status = 'succeeded';
                
            })
            .addCase(registerAction.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default RegisterSlice.reducer;
