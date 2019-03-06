const express = require('express');
const bodyParser = require('body-parser');
const Post = require('./models/post');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb+srv://bill:zSnJgmD4n8OdQvCD@cluster0-e94kb.mongodb.net/node-angular?retryWrites=true')
.then(() => {
  console.log('Connected to database!');
})
.catch(() => {
  console.log('Error connecting to database');
});

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  next();
});

app.post('/api/posts', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save();
  res.status(201).json({
    message: 'Post added successfully'
  });
});

app.get('/api/posts', (req, res, next) => {
  const posts = [
    {
      id: 'dfgxfg454',
      title: 'First server-side post',
      content: 'this is coming from the server'
    },
    {
      id: 'ryjfty8j79845',
      title: 'Second server-side post',
      content: 'this is also coming from the server'
    }
  ];
  res.status(200).json({
    message: 'Posts fetched successfully',
    posts: posts
  });
});

module.exports = app;
