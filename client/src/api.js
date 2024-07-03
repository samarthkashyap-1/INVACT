import axios from 'axios';

// const BASE_URL = 'https://f2v33x33-3000.inc1.devtunnels.ms';
const BASE_URL = import.meta.env.VITE_REACT_APP_URL;
console.log(BASE_URL);


// const token = localStorage.getItem("CineTracker")
//   ? JSON.parse(localStorage.getItem("CineTracker")).token
//   : null;

// console.log(token);

export const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include the token in each request
api.interceptors.request.use(
    config => {
        const token = localStorage.getItem("CineTracker")
            ? JSON.parse(localStorage.getItem("CineTracker")).token
            : null;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);




// export const api = axios.create({
//     baseURL: BASE_URL,
//     headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//     },
//     });

export const loginUser = async (userData) => {
    try {
        const response = await api.post(`${BASE_URL}/api/user/login`, userData);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
    }

export const registerUser = async (userData) => {
    try {
        const response = await api.post(`${BASE_URL}/api/user/register`, userData);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
    }

export const getMovies = async () => {
    try {
        const response = await api.get(`${BASE_URL}/api/movie`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
    }

export const getMovie = async (id) => {
    try {
        const response = await api.get(`${BASE_URL}/api/movie/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
    }

export const createMovie = async (movieData) => {
    try {
        const response = await api.post(`${BASE_URL}/api/movie`, movieData);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
    }

export const updateMovie = async (id, movieData) => {
    try {
        const response = await api.put(`${BASE_URL}/api/movie/${id}`, movieData);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
    }

export const deleteMovie = async (id) => {
    try {
        const response = await api.delete(`${BASE_URL}/api/movie/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
    }






