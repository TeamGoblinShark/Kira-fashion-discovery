const path = require("path");
const db = require("../db.js");
const uuid = require("uuid/v4");

module.exports = {
  getPictures: (req, res, next) => {
    db.any(
      "SELECT id, userid, city,likes,description,date,picture_url,tagsid FROM pictures WHERE city = $1",
      res.locals.cityid
    )
      .then(data => {
        res.locals.pictureData = data;
        next();
      })
      .catch(err => console.log("err at picControl.getPic: ", err));
  },
  uploadTags: (req, res, next) => {
    //rand strings for now
    const tags = [];
    for (let i = 0; i < 10; i += 1) {
      if (Math.random() * 2 > 1) {
        tags.push(true);
      } else {
        tags.push(false);
      }
    }

    //add to db
    res.locals.uuid = uuid();
    db.any(
      "INSERT INTO tags VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)",
      [res.locals.uuid, ...tags]
    )
      .then(data => {
        console.log(data);
        next();
      })
      .catch(err => {
        res.send(err);
      });
  },

  uploadPictures: (req, res, next) => {
    const { userid, description, picture_url } = req.body;
    const date = new Date()
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    const likes = 0;
    const city = res.locals.cityid;
    const tagsid = res.locals.uuid;
    console.log(tagsid);

    db.any(
      "INSERT INTO pictures(id, userid, city, likes, description, date, picture_url, tagsid) VALUES(uuid_generate_v4(),$1,$2,$3,$4,$5,$6,$7);",
      [userid, city, likes, description, date, picture_url, tagsid]
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
