const express = require('express');


const {
 
  sendTopics, 
  
} = require('./controllers/topics');

const {
 
  sendArticles, GetArticlesById,
  
} = require('./controllers/articles');

const app = express();

//app.use(express.json());

app.get('/api/topics', sendTopics);

app.get('/api/articles', sendArticles);

app.get('/api/articles/:article_id', GetArticlesById);



app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send('Server Error!');
});


module.exports = app;