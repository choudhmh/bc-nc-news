const { fetchArticles, getArticlesId, fetchCommentsById, } = require("../models/articleModel");


function sendArticles(req, res, next) {
 
    fetchArticles()
      .then((article) => {

        res.status(200).send({
          article,
        });
      })
      .catch((err) => {
        next(err);
      });
  }

  function GetArticlesById(req, res, next) {

    const { article_id } = req.params;
 
    getArticlesId(article_id)
      .then((article) => {
        

        res.status(200).send({
          article,
        });
      })
      .catch((err) => {
        next(err);
      });
  }

  function getCommentById(req, res, next) {

    const  {article_id }= req.params;


    fetchCommentsById(article_id)
      .then((article) => {
        

        res.status(200).send({
          article,
        });
      })
      .catch((err) => {
        next(err);
      });
  }




  

  module.exports = { sendArticles, GetArticlesById, getCommentById };

