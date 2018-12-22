const path = require("path");
const GeoIP = require("simple-geoip");
const geoip = new GeoIP("at_UdwCaNs9DDE1gsHk9hDO0MJITCK0p");
const db = require("../db.js");

module.exports = {
  getIP: (req, res, next) => {
    res.locals.ip = "74.87.214.86";
    if (!res.locals.ip) {
      return res.send("cannot get IP address");
    }
    return next();
  },

  getLoc: (req, res, next) => {
    geoip.lookup(res.locals.ip, (err, data) => {
      if (err) throw err;
      res.locals.state = data.location.region;
      res.locals.city = data.location.city;
      return next();
    });
  },

  getCID: (req, res, next) => {
    db.any("SELECT id FROM city WHERE (name = $1 AND state = $2)", [
      res.locals.city,
      res.locals.state
    ])
    .then(data=>{
      res.locals.cityid = data[0].id;
      next();
    })
    .catch(err => {
      console.error("Cannot find city in database");
      return res.sendStatus(500);
    });
  }
};
