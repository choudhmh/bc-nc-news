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

  function fetchCommentsById (article_id) {
    
    return db.query('SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at ASC;', [article_id])

      .then(comment => {
  
        if (comment.rows.length === 0) {
 
          return Promise.reject(                
            {
              status: 404,
              message: `Not Found` 
            }
          );
        } 

      
        else {
        return comment.rows;
        }
      });
  }

  const insertComments = (article_id, body, username) =>{
    
    return db.query(`INSERT INTO comments (body,author,article_id)
    VALUES ($1,$2,$3) RETURNING *;`, 
    [body, username, article_id])

   
      .then((data) => {
        if (data.rows.length === 0) {
          
          return Promise.reject(      
            `article not found!!!`
          );
        } else {
 return data.rows;
        }
        })
      }



    const incVoteById = (article_id, inc_votes) => {
    

        if (inc_votes === undefined) throw ({status: 400, message: 'Bad request'})
        else 

        return db.query('UPDATE articles SET votes = votes + $2 WHERE article_id= $1 RETURNING *;',[article_id, inc_votes])

            .then((response) => {
           
                 return response.rows;
            })
    }
  


// const getQuery = (article_id, topic) =>{
  
//   return db.query('SELECT owner, title, reviews.review_id, category, review_img_url, reviews.created_at, reviews.votes, designer, CAST(COUNT(comment_id) AS INT) comment_count FROM reviews LEFT JOIN comment ON comments.review_id = reviews.review_id WHERE category = $1 GROUP BY reviews.review_id ORDER BY ${sort_by} ${order}')

//   .then((result) => {

// console.log(result)
//     return result.rows;
//   });

// }
      
 

    
  

   module.exports = {
    fetchArticles, getArticlesId, fetchCommentsById, insertComments, incVoteById,  
  };

  