const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const morgan = require('morgan');
const Blog = require('./models/blogs');
const app = express();
const PORT = process.env.PORT;

app.use(express.static('public'));
const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.lhovv.gcp.mongodb.net/net_ninja>?retryWrites=true&w=majority`;
// express app
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(response =>
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  )
  .catch(err => console.log(err));

//morgan for logs
app.use(morgan('dev'));
//serve public folder - mostly css now
app.use(express.urlencoded({extented: true}));

//register view engine
app.set('view engine', 'ejs');

//routes
app.get('/', async (req, res) => {
  try {
    const response = await Blog.find();
    res.render('index', { title: 'Main', blogs: response });
  } catch (err) {
    console.log(err);
  }
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About Me' });
});

app.get('/create/', (req, res) => {
  res.render('create', { title: 'Create Interesting Posts!' });
});

app.get('/blogs/:id', (req, res) => {
  const {id } = req.params
  Blog.findById(id)
    .then((response) => {
      res.render('single', {title: 'Blog Details', blog: response});
    })
})
app.post('/blogs/', async (req, res) => {
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
});
app.delete('/blogs/:id', (req, res) => {
  const { id } = req.params;
  Blog.findByIdAndDelete(id)
    .then((response) => res.json({redirect: '/'}))
    .catch((err) => console.log(err))
})
// redirects
app.get('/about-us', (req, res) => {
  res.redirect('/about');
});

app.get('/all-blogs/', (req, res) => {
  res.redirect('/')
});

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
