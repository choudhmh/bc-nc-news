const express = require('express');

const { handleServerErrors,
  handlePsqlErrors,
  handleCustomErrors } = require("./errors/errors.js");

const {
 
  sendTopics, 
  
} = require('./controllers/topics');

const {
 
  sendArticles, GetArticlesById, getCommentById, postCommentsById,
  
} = require('./controllers/articles');

const app = express();
app.use(express.json());


app.get('/api/topics', sendTopics);

app.get('/api/articles', sendArticles);

app.get('/api/articles/:article_id', GetArticlesById);

app.get('/api/articles/:article_id/comments', getCommentById)

app.post('/api/articles/:article_id/comments', postCommentsById)


app.all("/*", (req, res) => {
  res.status(404).send({ message: "route not found" });
});

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