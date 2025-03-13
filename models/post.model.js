const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
  email: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "post",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  title: String,
  content: String,
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
});

module.exports = mongoose.model('post', postSchema)
