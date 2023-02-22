const express = require('express');

const { handleServerErrors,
  handlePsqlErrors,
  handleCustomErrors } = require("./errors/errors.js");

const {
 
  sendTopics, 
  
} = require('./controllers/topics');

const {
 
  sendArticles, GetArticlesById, getCommentById,
  
} = require('./controllers/articles');

const app = express();


app.get('/api/topics', sendTopics);

app.get('/api/articles', sendArticles);

app.get('/api/articles/:article_id', GetArticlesById);

app.get('/api/articles/:article_id/comments', getCommentById)

app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);





// app.use((err, req, res, next) => {
//   if( err.code = '22P02' ){
//   res.status(404).send({msg: 'Not Found'});
//   }else next(err);
// });

// app.use((err, req, res, next) => {
//   if (err.code = '22P02') res.status(400).send({ message: `Invalid ID` })
//   else next(err);
// });


// app.use((err, req, res, next) => {
//   res.status(500).send('Server Error!');
// });



module.exports = app;