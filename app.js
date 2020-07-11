const express = require('express');
const morgan = require('morgan');

const blogs = [
  {title: 'Blog One', snippet: 'Hello World'},
  {title: 'Blog Two', snippet: 'Hello Country'},
  {title: 'Blog Three', snippet: 'Hello State'},
];
// express app
const app = express();

// morgan for logs
app.use(morgan('common'));

//register view engine
app.set('view engine', 'ejs');

//  default port for requests
app.listen(3000);

//routes
app.get('/', (req, res) => {
  res.render('index', { title: 'Main', blogs });
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
  res.status(404).render('404', {title: '404'});
});
