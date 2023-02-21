const { fetchArticles } = require("../models/articleModel");


function sendArticles(req, res, next) {
 
    fetchArticles()
      .then((article) => {
        //console.log(article)

        res.status(200).send({
          article,
        });
      })
      .catch((err) => {
        next(err);
      });
  }

  module.exports = { sendArticles,};

