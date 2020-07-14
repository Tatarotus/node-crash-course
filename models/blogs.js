const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requiredString = { type: String, required: true };
const blogSchema = new Schema(
  {
    title: requiredString,
    snippet: requiredString,
    //body: requiredString,
  },
  { timestamps: true }
);

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
