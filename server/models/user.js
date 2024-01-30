const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 15,
    },
    lastName: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 15,
    },
    birthday: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 30,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      minlength: 3,
      maxLength: 20,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
    },
    gender:{
      type: String,
      required: true,
      trim: true,
      minlength: 4,
    },
    tokens: [{ type: Object }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
