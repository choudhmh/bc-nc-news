const db = require('../db/connection');


function fetchArticles() {
    

     return db.query('SELECT articles.article_id, articles.author, articles.title, articles.topic, articles.created_at, articles.votes, articles.article_img_url, CAST(COUNT(comments.comment_id)AS INT) AS comment_count FROM articles LEFT JOIN comments ON comments.article_id = articles.article_id GROUP BY articles.article_id ORDER BY created_at DESC;')

     .then((result) => {

       return result.rows;
     });
   }


  function getArticlesId(article_id) {
    
    return db.query('SELECT articles.article_id, articles.author, articles.title, articles.topic, articles.created_at, articles.votes, CAST(COUNT(comments.comment_id)AS INT) AS comment_count FROM articles LEFT JOIN comments ON comments.article_id = articles.article_id WHERE articles.article_id = $1 GROUP BY articles.article_id;',[article_id])

      .then(article => {
      

        if (article.rows.length === 0) {
          
          return Promise.reject(      
            `article not found!!!`
          );
        } else {
        return article.rows;
        }
      });
  }


 




   module.exports = {
    fetchArticles, getArticlesId,
  };

  
