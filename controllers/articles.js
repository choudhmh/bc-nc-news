const { fetchArticles, getArticlesId, fetchCommentsById, insertComments,incVoteById, getQuery,} = require("../models/articleModel");


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
      .then((comment) => {
        res.status(200).send({
          comment,
        });
      })
      .catch((err) => {
        next(err);
      });
  }

  
  function postCommentsById(req, res, next) {
    const { article_id } = req.params;
    const { username, body } = req.body;


    insertComments(article_id, body, username)
      .then((comment) => {
        res.status(201).send({
          comment,
        });
        
      })
      
      .catch((err) => {
    
        next(err);
      });
  }


   function patchArticleById (req, res, next) {
    const { article_id } = req.params;
    const { inc_votes } = req.body;

    incVoteById(article_id, inc_votes)

        .then((article) => {
            res.status(200).send({ article });
        })
        .catch((err) => {
 
          next(err);
        });
}

// function getArticeQuery (req, res, next) {
//   const { article_id } = req.params;
//   const { topic } = req.params;

//   getQuery(article_id, topic)

//       .then((article) => {
//           res.status(200).send({ article });
//       })
//       .catch((err) => {

//         next(err);
//       });
// }



  

  module.exports = { sendArticles, GetArticlesById, getCommentById, postCommentsById, patchArticleById,  };

