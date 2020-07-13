const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const morgan = require('morgan');
const Blog = require('./models/blogs');

const app = express();

const PORT = process.env.PORT;

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

const blogs = [
  { title: 'Blog One', snippet: 'Hello World' },
  { title: 'Blog Two', snippet: 'Hello Country' },
  { title: 'Blog Three', snippet: 'Hello State' },
];

// morgan for logs
//app.use(morgan('common'));
app.use((req, res, next) => {
  console.log('A new request is made:');
  console.log('host: ', req.hostname);
  console.log('path: ', req.path);
  console.log('method: ', req.method);
  console.log(`[ ${new Date()} ]`);
  next();
});

app.use(express.static('public'));
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

app.get('/add-blog', async (req, res) => {
  const blog = new Blog({
    title: 'new blog #2',
    snippet: 'about my new blog',
    body: 'more about my new blog',
  });
  try {
    response = await blog.save();
    res.send(response);
  } catch (err) {
    console.log(err);
  }
});
app.get('/all-blogs/', (req, res) => {
  res.redirect('/')
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About Me' });
});

// redirects
app.get('/about-us', (req, res) => {
  res.redirect('/about');
});

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create Interesting Posts!' });
});

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
