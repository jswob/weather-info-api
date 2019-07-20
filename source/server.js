const express = require("express");
const mongoose = require("mongoose");
const dotenv = require('dotenv');

const app = express();

dotenv.config();

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0-zxrzw.mongodb.net/test?retryWrites=true&w=majority`,
    { useNewUrlParser: true }
  )
  .then(() => {
    app.listen(8000);
  })
  .catch(error => {
    throw error;
  })
