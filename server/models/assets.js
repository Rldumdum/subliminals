const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const assetSchema = new Schema({
  video: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Asset", assetSchema);
