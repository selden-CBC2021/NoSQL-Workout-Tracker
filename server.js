const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
require ('dotenv').config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));


mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/workout-tracker",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true,
      // useFindAndModify: false
    }
  );
    // requiring routes/index.js which contains html + api routes
  app.use(require("./routes/index"));
  app.use(require("./routes/apiRoutes"))
  app.use(require("./routes/htmlRoutes"))
 

  app.listen(PORT, () => {
    console.log(`App running on localhost:${PORT} !`);
  });