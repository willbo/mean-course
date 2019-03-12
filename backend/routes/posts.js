const express = require('express');
const PostsController = require('../controllers/posts');

const checkAuth = require('../middleware/check-auth');
const extractFile = require('../middleware/file');

const router = express.Router();

// creating new posts
router.post('', checkAuth, extractFile, PostsController.createPost);

// getting posts
router.get('', PostsController.getPosts);

// getting a single post
router.get('/:id', PostsController.getPost);

// updating a post
router.put('/:id', checkAuth, extractFile, PostsController.updatePost);

// deleting a post
router.delete('/:id', checkAuth, PostsController.deletePost);

module.exports = router;
