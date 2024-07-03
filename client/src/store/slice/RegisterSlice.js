import { createSlice , createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { registerUser } from '../../api';

export const registerAction = createAsyncThunk('/Register', async (userData, {rejectWithValue}) => {
    try {
        const response = await registerUser(userData);
   
        
        return response;
        
    } catch (error) {

        return rejectWithValue(error);
        
    }
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
