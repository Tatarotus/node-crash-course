const { Router } = require('express');
const blogController = require('./controllers/blogController');
const router = Router();


router.get('/about', (req, res) => {
  res.render('about', {title: 'About Me'})
});

//controllers
router.get('/', blogController.blog_index);
router.get('/create/', blogController.blog_create_get);

router.get('/blogs/:id', blogController.blog_details);

router.post('/blogs/', blogController.blog_create_post);

router.delete('/blogs/:id', blogController.blog_delete);



//redirects
router.get('/about-us', (req, res) => {
  res.redirect('/about');
});
router.get('/all-blogs/', (req, res) => {
  res.redirect('/')
});

module.exports = router;
