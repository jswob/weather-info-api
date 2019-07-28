const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user");

const app = express();

app.use(bodyParser.json());

dotenv.config();

app.use("/users", userRoutes);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorData = [];

  if (errorStatus === 422) {
    err.data.array().forEach(validationError => {
      errorData.push({
        detail: validationError.msg,
        source: {
          pointer: "data/attributes/" + validationError.param.split(".")[1]
        }
      });
    });
  } else {
    errorData.push({
      details: "Server don't work"
    });
  }
  res.status(errorStatus).json({ errors: errorData });
});

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_USER}:${
      process.env.MONGODB_PASSWORD
    }@cluster0-zxrzw.mongodb.net/weather-info?retryWrites=true&w=majority`,
    { useNewUrlParser: true }
  )
  .then(() => {
    app.listen(8000);
  })
  .catch(error => {
    throw error;
  });
