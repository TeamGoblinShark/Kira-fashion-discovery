const db = require('./db.js');
const express = require('express');
const bodyParser = require('body-parser');
// const expressip = require('express-ip')
const app = express();
// const geoip = require('geoip-lite');

const GeoIP = require('simple-geoip');
require('dotenv').config();
const geoip = new GeoIP(process.env.geoipkey)

const PORT = 3000;

// app.use(expressip().getIpInfoMiddleware);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.static(__dirname + '/../../dist'));

app.listen(PORT, (err) => {
  if (err) console.log(err);
  else console.log(`Server listening on Port: ${PORT}...`);
});

function getIpAddress(req, res, next)  {
  // app.get({'host': 'api.ipify.org', 'port': 80, 'path': '/'}, (err, res) => {
  //   if (err) return res.send("ERROR in IP")
  //   res.send(res)
  //   next()
  //   // resp.('data', function(ip) {
  //   //   console.log("My public IP address is: " + ip);
  //   // });
  // });
  // const ipaddress = (req.headers['x-forwarded-for'] || '').split(',').pop() || 
  // req.connection.remoteAddress || 
  // req.socket.remoteAddress || 
  // // req.connection.socket.remoteAddress;
  const ipaddress = '74.87.214.86';
  if (!ipaddress) {return res.send('Cannot get ipaddress')};
  res.locals.ipaddress = ipaddress;
  next();
}

// require('dotenv').config();
// const getInfo = (req, res, next) => {
//   app.get(`http://api.ipstack.com/${res.locals.ipaddress} ? access_key = ${process.env.apikey}`, (req, res, err, next) => {
//     if (err) {res.send("ERROR when obtaining city")}
//     else {res.locals.city = res.city; next()}
//   })
// };

// app.post('/test', (req, res) => {
//   fetch(`http://api.ipstack.com/74.87.214.86 ? access_key = ${process.env.apikey}`, (req, res, err, next) => {
//     if (err) {return res.send("ERROR when obtaining city")}
//     else {return res.send("Success")}
//   })
// }
//)

function grabLocation (req, res, next) {
  geoip.lookup('74.87.214.86', (err, data) => {
    if (err) { throw err }
    else
    {res.locals.state = data.location.region;
      res.locals.city = data.location.city;
      res.locals.latitude = data.location.lat;
      res.locals.longitude = data.location.lng;
      next();
    }
  })
}
// app.get('/pictures', getIpAddress, (req,res) => {
//   const geo = geoip.lookup(res.locals.ipaddress);
// })
app.post('/city', getIpAddress, grabLocation, (req, res, next) => {
  // const { name, state } = req.body;
  // console.log(res.locals.city, res.locals.state)
  db.any('INSERT INTO city(id, name, state) VALUES (uuid_generate_v4(), $1, $2);', [res.locals.city, res.locals.state])
    .then((data) => {
      // success;
      console.log('Success.');
      res.json(data);
      next();
    })
    .catch((error) => {
      // error;
      console.log(error);
      res.send('ERROR! Could not send to database');
  });
})