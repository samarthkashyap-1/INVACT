const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const userRouter = require("./routes/user");

const errorHandler = require("./middleware/errorMiddleware");

const cors = require("cors");
const movieRouter = require("./routes/movie");

app.use(cors());

require("dotenv").config();
const url = process.env.MONGO_URI;
// console.log(url)

app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/movie", movieRouter);


mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Failed to connect to MongoDB", err);
  });

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
