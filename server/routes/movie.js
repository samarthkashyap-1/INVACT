const movieRouter = require("express").Router();
const movieController = require("../controllers/MovieController");
const {protect} = require("../utils/auth");

movieRouter.get("/",protect, movieController.getAllMovies);
movieRouter.get("/:id",protect,  movieController.getMovie);
movieRouter.post("/",protect,  movieController.createMovie);
movieRouter.put("/:id",protect,  movieController.updateMovie);
movieRouter.delete("/:id",protect,   movieController.deleteMovie);

module.exports = movieRouter;

