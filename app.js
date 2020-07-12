const express = require('express');
const morgan = require('morgan');

const blogs = [
  { title: 'Blog One', snippet: 'Hello World' },
  { title: 'Blog Two', snippet: 'Hello Country' },
  { title: 'Blog Three', snippet: 'Hello State' },
];
// express app
const app = express();
const PORT = 3000;

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

//  default port for requests
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

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
  res.status(404).render('404', { title: '404' });
});
