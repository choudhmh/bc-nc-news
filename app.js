const express = require('express');
//const { serverError } = require('./controller/errorController');

const {
 
  sendTopics,
  
} = require('./controllers/topics');

const app = express();

//app.use(express.json());

app.get('/api/topics', sendTopics);



module.exports = app;