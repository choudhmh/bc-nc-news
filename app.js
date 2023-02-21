const express = require('express');


const {
 
  sendTopics, 
  
} = require('./controllers/topics');

const {
 
  sendArticles, GetArticlesById, 
  
} = require('./controllers/articles');

const app = express();


app.get('/api/topics', sendTopics);

app.get('/api/articles', sendArticles);

app.get('/api/articles/:article_id', GetArticlesById);



app.use((err, req, res, next) => {
  res.status(404).send({msg: 'Not Found'});
});

app.use((err, req, res, next) => {
  if( err.code = '22P02' ){
    res.status(400).send({msg: 'Invalid ID'})
  }
});



app.use((err, req, res, next) => {
  res.status(500).send('Server Error!');
});



module.exports = app;