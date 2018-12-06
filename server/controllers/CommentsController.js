const path = require("path");
const db = require("../db.js");

module.exports = {
  getComments: (req, res) => {
    db.any(
      "SELECT comment FROM comments"
    )
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.send(err);
      });
  },

  postComments: (req, res) => {
    const { pictureid, userid, comment } = req.body;
    const datetime = new Date()
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    db.any(
      "INSERT INTO comments(id, pictureid, userid, comment, datetime) VALUES(uuid_generate_v4(),$1,$2,$3,$4);",
      [pictureid, userid, comment, datetime]
    )
      .then(data => {
        res.locals.data = data;
        next();
      })
      .catch(err => {
        res.send(err);
      });
  }
};
