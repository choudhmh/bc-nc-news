const db = require('../db/connection');


function fetchArticles() {
    
   // console.log("inside moel");

     return db.query('SELECT articles.article_id, articles.author, articles.title, articles.topic, articles.created_at, articles.votes, articles.article_img_url, CAST(COUNT(comments.comment_id)AS INT) AS comment_count FROM articles LEFT JOIN comments ON comments.article_id = articles.article_id GROUP BY articles.article_id ORDER BY created_at DESC;')

     .then((result) => {


       return result.rows;
     });
   }


   module.exports = {
    fetchArticles,
  };

  
// const articleSelection = 'articles.article_id, articles.author, articles.title, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.comment_id) AS comment_count';
// const articleArgs = ['LEFT OUTER', 'comments', 'article_id', 'articles.article_id'];

// exports.fetchArticles = (req) => {
//   const conditions = req.params.article_id
//       ? [{ 'articles.article_id': req.params.article_id }]
//       : req.query.topic
//           ? [{ 'articles.topic': `'${req.query.topic}'` }]
//           : [];
//   return getFrom(
//       'articles',
//       articleSelection + `${req.id ? '' : ',COUNT(DISTINCT articles.article_id) AS total_count'}`,
//       conditions,
//       ...articleArgs,
//       req.query.sort_by || 'created_at', req.query.order_by || 'desc',
//       req.query.limit || null, req.query.p || 1,
//   );
// }