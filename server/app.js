const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const mongoose = require("mongoose");
const postRoutes = require("./routes/postRoutes");
const accountRoutes = require("./routes/accountRoutes");
const cors = require('cors')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:3000',
}))

app.set("view engine", "ejs");

app.get("/account", (req, res, next) => {
  res.redirect("/account");
});

app.get("/", (req, res) => {
  res.redirect("/posts");
});

app.use("/api/posts", postRoutes);
app.use("/api/account", accountRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to database");
    app.listen(3001, () => {});
  })
  .catch((err) => {
    console.log(err);
  });
