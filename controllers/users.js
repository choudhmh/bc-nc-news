const { fetchUsers, } = require("../models/usersModel");

function getUsers(req, res, next) {
 
    fetchUsers()
      .then((user) => {

        res.status(200).send({
          user,
        });
      })
      .catch((err) => {
        next(err);
      });
  }


  module.exports = {getUsers,}