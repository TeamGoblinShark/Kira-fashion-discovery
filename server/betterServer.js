// necessary requirements to use express
const db = require("./db.js");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const locationController = require("./controllers/LocationController.js");
const pictureController = require("./controllers/PictureController.js");
const otherController = require("./controllers/OtherController.js");
const commentsController = require("./controllers/CommentsController.js");

require("dotenv").config();

const PORT = 3000;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/../dist"));

//gets cityid in res.locals.cityid
app.use(
  locationController.getIP,
  locationController.getLoc,
  locationController.getCID
);

app.get("/pictures", pictureController.getPictures, (req, res) => {
  res.send(res.locals.pictureData);
  /* requests will receive array of pictures
  [
    {
      "id":uuid,
      "userid":uuid,
      "city":uuid,
      "likes":0,
      "description":text,
      "date":date,
      "picture_url":text,
      "tagsid":uuid,
    }
  ]
  */
});

app.post(
  "/pictures",
  pictureController.uploadTags,
  pictureController.uploadPictures,
  (req, res) => {
    res.json(res.locals.data);
    /* send this
  {
  "userid":userid of poster,
  "description":text,
  "picture_url":text,
  }
  */
  }
);

app.get("/increaseLikes/:id", otherController.increaseLikes, (req, res) => {
  // res.send(res.locals.likes);
});

app.get("/likes/:id", otherController.getLikes, (req, res) => {
  //gets likes
  //returns integer
});

app.get("/comments/:pic", commentsController.getComments, (req, res, next) => {
  // res.send(res.locals.data);
  /* requests will receive array of comments
[
  {
  "id":uuid,
  "pictureid":uuid,
  "userid":uuid,
  "comment":string,
  "datetime":date,
  }
]

  */
});

app.post("/comments", commentsController.postComments, (req, res, next) => {
  res.json(res.locals.data);

  /* send this
  {
  "pictureid":uuid,
  "userid":uuid,
  "comment":string,
  }
  */
});

app.get("/tags/:id", otherController.getTags, (req, res, next) => {
  // res.json(res.locals.data);
  /*
    {
        "id": "f9f2758a-0b11-421f-bddb-309529ebed19",
        "dressy": "true",
        "designer": "false",
        "activewear": "true",
        "vintage": "false",
        "chic": "false",
        "artsy": "false",
        "sexy": "true",
        "casual": "false",
        "sophisticated": "true",
        "urban": "true"
    }
  */
});

// check if server is online and connected
app.listen(PORT, err => {
  if (err) console.log(err);
  else console.log(`Server listening on Port: ${PORT}...`);
});
