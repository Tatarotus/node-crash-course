const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const morgan = require('morgan');
const routes = require('./routes');
const app = express();
const PORT = process.env.PORT;

app.use(express.static('public'));
const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.lhovv.gcp.mongodb.net/net_ninja>?retryWrites=true&w=majority`;
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
// 404 page
app.use(routes)
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
