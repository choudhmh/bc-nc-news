const db = require('../db/connection');

function removeCommentById (comment_id) {
  return db.query(
      `DELETE FROM comments
      WHERE comment_id = $1
      RETURNING *;`,
      [comment_id]
    )
    .then((result) => {

console.log(result.rows)

      return result.rows;
    });
}


 module.exports = {
  removeCommentById};