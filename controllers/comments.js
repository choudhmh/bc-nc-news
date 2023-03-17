const { removeCommentById, } = require("../models/commentModel");

function deleteCommentById (req, res, next) {
    const { comment_id } = req.params;
    removeCommentById(comment_id)
      .then(() => {
        res.status(204).send();
      })
      .catch(next);
  }

  exports.deleteCommentByCommentId = (req, res, next) => {
    const comment_id = +req.params.comment_id;
    Promise.all([
      checkCommentExists(comment_id),
      fetchAndDeleteCommentByCommentId(comment_id),
    ])
      .then((result) => {
        res.status(204).send({ comments: result[0] });
      })
      .catch((err) => {
        next(err);
      });
  };


  module.exports = { deleteCommentById,};