const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
require ('dotenv').config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(morgan("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));


mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost/workout-tracker',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  );

  app.listen(PORT, () => {
    console.log(`App running on localhost:${PORT} !`);
  });