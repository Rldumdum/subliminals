const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const mongoose = require("mongoose");
const postRoutes = require("./routes/postRoutes");
const accountRoutes = require("./routes/accountRoutes");
const assetsRoutes = require('./routes/assetsRoutes')
const notesRoutes = require('./routes/notesRoutes')
const cors = require("cors");
const cloudinary = require("cloudinary");

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
  secure: true,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.set("view engine", "ejs");

app.get('/assets', (req,res)=> {
  res.redirect('/assets')
})
app.get("/account", (req, res, next) => {
  res.redirect("/account");
});
app.get('notes', (req,res) => {
  res.redirect('/notes')
})
// app.get("/", (req, res) => {
//   res.redirect("/posts");
// });

// app.use("/api/posts", postRoutes);
app.use("/api/account", accountRoutes);
app.use("/api/assets", assetsRoutes);
app.use("/api/notes", notesRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to database");
    app.listen(3001, () => {});
  })
  .catch((err) => {
    console.log(err);
  });
