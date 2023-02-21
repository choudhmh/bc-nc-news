
const db = require('../db/connection');



function fetchTopics() {
 // console.log("inside moel");
  return db.query('SELECT * FROM topics').then((result) => {
   // console.log(result.rows)
    return result.rows;
  });
}



module.exports = {
  fetchTopics,
};