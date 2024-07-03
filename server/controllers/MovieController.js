const Movie = require('../models/movie');
const ErrorHandler = require('../utils/customError');

const getAllMovies = async (req, res, next) => {
    try {
        const movies = await Movie.find({
            user: req.user.id
        });
    
        res.status(200).json(movies);
    } catch (error) {
        next(error);
    }
    }

const getMovie = async (req, res, next) => {
    const { id } = req.params;
    try {
        const movie = await Movie.findById(id);
        if (!movie) {
            return next(new ErrorHandler('Movie not found', 404));
        }
        res.status(200).json(movie);
    } catch (error) {
        next(error);
    }
}

const createMovie = async (req, res, next) => {
    const { title, description, releaseYear, genre, watched, rating, review } = req.body;
    const user = req.user.id;
    try {
        const movie = new Movie({
            title,
            description,
            releaseYear,
            genre,
            watched,
            rating,
            review,
            user
        });
        const savedMovie = await movie.save();
        res.status(201).json(savedMovie);
    } catch (error) {
        next(error);
    }
}

const updateMovie = async (req, res, next) => {
    const { id } = req.params;
    const { title, description, releaseYear, genre, watched, rating, review } = req.body;

    console.log(req.body);
    try {
        const movie = await Movie.findById(id);
        console.log(movie);
        if (!movie) {
            return next(new ErrorHandler('Movie not found', 404));
        }
        movie.title = title;
        movie.description = description;
        movie.releaseYear = releaseYear;
        movie.genre = genre;
        movie.watched = watched;
        movie.rating = rating;
        movie.review = review;

        
        const updatedMovie = await movie.save();

        console.log(updatedMovie);
        res.status(200).json(updatedMovie);
    } catch (error) {
        next(error);
    }
}

const deleteMovie = async (req, res, next) => {
    const { id } = req.params;
    try {
        const movie = await Movie.findByIdAndDelete(id);
        if (!movie) {
            return next(new ErrorHandler('Movie not found', 404));
        }
        
        
        
        res.status(200).json(movie);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllMovies,
    getMovie,
    createMovie,
    updateMovie,
    deleteMovie
}
