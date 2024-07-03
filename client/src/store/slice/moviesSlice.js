import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMovies, updateMovie, createMovie, deleteMovie, getMovie } from "../../api";

export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
    try {
        const response = await getMovies();
        return response; // Assuming getMovies() returns data field
    } catch (error) {
        throw Error("Failed to fetch movies");
    }
});


export const fetchMovie = createAsyncThunk("movies/fetchMovie", async (id) => {
    try {
        const response = await getMovie(id);
        // console.log(response);
        return response; // Assuming getMovie() returns data field
        
    } catch (error) {
        throw Error("Failed to fetch movie");
    }
});



export const createMovieAction = createAsyncThunk("movies/createMovie", async (movieData) => {
    try {
        const response = await createMovie(movieData);
        return response; // Assuming createMovie() returns data field
    } catch (error) {
        throw Error("Failed to create movie");
    }
});

export const updateMovieAction = createAsyncThunk("movies/updateMovie", async ( movieData) => {
  
    try {
        const response = await updateMovie(movieData.id, movieData.updatedMovie);
        return response; // Assuming updateMovie() returns data field
    } catch (error) {
        throw Error("Failed to update movie");
    }
});

export const deleteMovieAction = createAsyncThunk("movies/deleteMovie", async (id) => {
    try {
        const response = await deleteMovie(id);
        return response; // Assuming deleteMovie() returns data field
    } catch (error) {
        throw Error("Failed to delete movie");
    }
});



const moviesSlice = createSlice({
    name: "movies",
    initialState: {
        movies: [],
        movie: {},
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovies.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchMovies.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.movies = action.payload;
            })
            .addCase(fetchMovies.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(createMovieAction.pending, (state) => {
                state.status = "loading";
            })
            .addCase(createMovieAction.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.movies.push(action.payload); // Assuming you want to add the created movie to the list
            })
            .addCase(createMovieAction.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(updateMovieAction.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateMovieAction.fulfilled, (state, action) => {
                state.status = "succeeded";
                // Assuming you want to update the movie in the list; update logic depends on your API response
                const updatedMovieIndex = state.movies.findIndex(movie => movie.id === action.payload.id);
                if (updatedMovieIndex !== -1) {
                    state.movies[updatedMovieIndex] = action.payload;
                }
            })
            .addCase(updateMovieAction.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(deleteMovieAction.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deleteMovieAction.fulfilled, (state, action) => {
                state.status = "succeeded";

                // Assuming you want to remove the deleted movie from the list
                state.movies = state.movies.filter(movie => movie.id !== action.payload.id);
              
                // console.log(state.movies)
                
            })
            .addCase(deleteMovieAction.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(fetchMovie.pending, (state) => {
                state.status = "loading";
            }
            )
            .addCase(fetchMovie.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.movie = action.payload;
            })
            .addCase(fetchMovie.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });

    },
});

export const moviesActions = {
    fetchMovies,
    fetchMovie,
    createMovieAction,
    updateMovieAction,
    deleteMovieAction,
};

export default moviesSlice.reducer;
