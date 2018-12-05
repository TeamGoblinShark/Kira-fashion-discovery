// necessary requirements to use express
const db = require('./db.js');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();

// requirements for using geoip library
require('dotenv').config();
const GeoIP = require('simple-geoip');

const geoip = new GeoIP("at_UdwCaNs9DDE1gsHk9hDO0MJITCK0p");

// localhost:3000
const PORT = 3000;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.static(__dirname + '/../dist'));




// automatically call getIpAddress and grabLocation
app.use(getIpAddress, grabLocation, grabCityId)





function getIpAddress(req, res, next)  {
// Middleware that grabs IP address of the client; should be able to be
// done based on requests but have not done yet; set to Los Angeles
  const ipaddress = '74.87.214.86';
  // Throw an error if there is an issue with the ipaddress
  if (!ipaddress) { return res.send('Cannot get ipaddress') }
  // Savve the ipaddress into res.locals
  res.locals.ipaddress = ipaddress;
  next();
}

function grabLocation (req, res, next) {
  geoip.lookup('74.87.214.86', (err, data) => {
    if (err) throw err;
    else {
      res.locals.state = data.location.region;
      res.locals.city = data.location.city;
      res.locals.latitude = data.location.lat;
      res.locals.longitude = data.location.lng;
      return next();
    }
  });
}
// app.get('/pictures', getIpAddress, (req,res) => {
//   const geo = geoip.lookup(res.locals.ipaddress);
// })
function grabUserId (req, res, next) {
  console.log(req.body.username);
  console.log(req.body.password)
  db.any('SELECT id FROM users WHERE (username = $1 AND password = $2)', [req.body.username, req.body.password])
    .then((data) => {
      res.locals.userid = data[0].id;
 

      next();
    })
    .catch((err) => {
      console.error('Cannot find user in database');
      return res.sendStatus(500);
    });
}
function grabCityId (req, res, next) {
  db.any('SELECT id FROM city WHERE (name = $1 AND state = $2)', [res.locals.city, res.locals.state])
    .then((data) => {
      res.locals.cityid = data[0].id;
      next();
    })
    .catch((err) => {
      console.error('Cannot find city in database');
      return res.sendStatus(500);
    })
}

function updateCityId (req, res, next) {
  db.any('UPDATE users SET city = $1 WHERE id = $2', [res.locals.cityid, res.locals.userid])
    .then((data) => {
      console.log('Successfully updated city ID');
      next();
    })
    .catch((err) => {
      console.error('Error updating city for user');
      return res.sendStatus(500)
    })
}
function grabPics (req, res, next) {
  console.log(res.locals.cityid)
  db.any('SELECT id, picture_url, userid, likes, description, style_nightlife, style_outdoor FROM pictures WHERE city = $1', [res.locals.cityid])
    .then((data) => {
      let returnData = {};
      returnData = data.reduce((accum, el) => {
        let id = el.id;
        accum[id] = {
          'picture_url': el.picture_url,
          'userid' : el.userid,
          'likes' : el.likes,
          'description' : el.description,
          'style_nightlife' : el.style_nightlife,
          'style_outdoor' : el.style_outdoor,
        };
        return accum;

      }, returnData)
      return res.json(returnData)
    })
    .catch((error) => {
      console.log(error);
      res.send('ERROR! cannot grab links from database')
    })
}

app.get('/pictures', grabPics);

app.post('/login', grabUserId, updateCityId, (req, res) =>{
  return res.json(res.locals.userid);
});

// app.post('/uploadPicture', (req, res) =>{

//   let { userUuid, uploadedFileCloudinaryUrl, uploadText, uploadStyleClickNightOut, uploadStyleClickOutDoor} = req.body;

  
//   db.any('INSERT INTO pictures(id, userid, city, latitude, longitude, likes, description, date, picture_url, style_nightlife, style_outdoor) VALUES (uuid_generate_v4(), $1, $2, $3, $4, $5, $6, $7, $8, $9, $10);'
//   ,[userUuid, res.locals.cityid, res.locals.latitude, res.locals.longitude, 0, uploadText, null, uploadedFileCloudinaryUrl, uploadStyleClickNightOut, uploadStyleClickOutDoor ])
//     .then((data) => {
//       console.log(data);
//       console.log('Success storing picture info');
//       db.any('INSERT INTO tags VALUES ( uuid_generate_v4(), $1, $2, $3, $4, $5, $6, $7, $8, $9, $10)', [...req.body.tags])
//       .then((data) => {
//         db.any('UPDATE pictures set tagid = $1 where pictureid = $2', [data, userUuid] )
//       })
//       return res.json(data);
//     })
//     .catch((error) => {
//       console.log(error);
//       return res.send('ERROR! Could not save picture to database');
//     });
// })


// testing connection to database 
app.post('/city', (req, res, next) => {
  db.any('INSERT INTO city(id, name, state) VALUES (uuid_generate_v4(), $1, $2);', [res.locals.city, res.locals.state])
    .then((data) => {
      res.json(data);
      next();
    })
    .catch((error) => {
      // error;
      console.log(error);
      res.send('ERROR! Could not send to database');
    });
});

app.get('/comments/:pic', (req, res, next) =>{
  db.any('SELECT id, pictureid, userid, comment, datetime FROM comments WHERE pictureid = $1', req.params.pic)
  .then((data) => {
      res.json(data);
  })
  .catch((error) => {
    // error;
    console.log(error);
    res.send('ERROR! Could not get comments from database');
  });
});

app.post('/comments', (req, res, next) => { 
 req.body.datetime = new Date ();
 console.log("rqqqq:", req.body);
  if(req.body.pictureid && req.body.userid && req.body.comment){
  db.any('INSERT INTO comments(pictureid, userid, comment, datetime) VALUES ($1, $2, $3, $4);', [req.body.pictureid, req.body.userid, req.body.comment, req.body.datetime])
  .then((data) => {
    res.send(data);  
  })
  }else res.status(404);
})

app.post('/tags', (req, res, next) => { 
  console.log("rqqqq:", req.body);
   if(req.body.pictureid && req.body.userid && req.body.comment){
   db.any('INSERT INTO tags(pictureid, userid, comment, datetime) VALUES ($1, $2, $3, $4);', [req.body.pictureid, req.body.userid, req.body.comment, req.body.datetime])
   .then((data) => {
     res.send(data);  
   })
   }else res.status(404);
 
 })
// check if server is online and connected
app.listen(PORT, (err) => {
  if (err) console.log(err);
  else console.log(`Server listening on Port: ${PORT}...`);
});