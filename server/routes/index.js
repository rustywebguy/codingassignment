var express = require('express');
var router = express.Router();

var blog = require('./blog');

router.get('/blog/v1/', blog.getAll);
router.get('/blog/v1/:id', blog.getById);
router.post('/blog/v1/create', blog.newBlog);
router.post('/blog/v1/update', blog.updateBlog);
router.delete('/blog/v1/delete', blog.deleteBlog);

module.exports = router;