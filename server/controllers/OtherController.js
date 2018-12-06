const path = require("path");
const db = require("../db.js");

module.exports = {
  increaseLikes: (req, res, next) => {
    db.any("SELECT likes FROM pictures WHERE id = $1", req.params.id).then(
      data => {
        db.any("UPDATE pictures SET likes = $1 WHERE id=$2", [
          data[0].likes + 1,
          req.params.id
        ])
          .then(res.status(200))
          .catch(err => res.send(err));
      }
    );
  },

  getLikes: (req, res, next) => {
    db.any("SELECT likes FROM pictures WHERE id=$1", req.params.id)
    .then(data =>{
      res.json(data[0].likes);
    })
  },

  getTags: (req, res) => {
    db.any("SELECT tagsid FROM pictures WHERE id = $1", req.params.id)
      .then(data => {
        console.log(data);
        db.any("SELECT * FROM tags WHERE id = $1", data[0].tagsid)
          .then(data => {
            res.json(data[0]);
            // res.locals.data= data;
            // next();
          })
          .catch(err => {
            res.send(err);
          });
      })
      .catch(err => {
        res.send(err);
      });
  }
};
