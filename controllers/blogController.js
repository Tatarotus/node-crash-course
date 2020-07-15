const Blog = require('../models/blogs');

const blog_index = async (req, res) => {
  try {
    const response = await Blog.find();
    res.render('index', { title: 'Main', blogs: response });
  } catch (err) {
    console.log(err);
  }
}

const blog_details = (req, res) => {
  const {id } = req.params
  Blog.findById(id)
    .then((response) => {
      res.render('single', {title: 'Blog Details', blog: response});
    });
}

const blog_create_get = (req, res) => {
  res.render('create', { title: 'Create Interesting Posts!' });
}

const blog_create_post = async (req, res) => {
  const { title, snippet } = req.body;
  const blog = new Blog({
    title,
    snippet,
  });
  try {
    response = await blog.save();
    res.redirect('/');
  } catch (err) {
    console.log(err);
  }

}


const blog_delete = (req, res) => {
  const { id } = req.params;
  Blog.findByIdAndDelete(id)
    .then((response) => res.json({redirect: '/'}))
    .catch((err) => console.log(err))

}

  module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete,
  }
