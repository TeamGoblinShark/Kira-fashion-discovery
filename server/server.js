const db = require('./db.js');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.static(__dirname + '/../../dist'));

app.listen(PORT, (err) => {
    if (err) console.log(err);
    else console.log(`Server listening on Port: ${PORT}...`);
  });
app.post('/city', (req,res) => {
const { name, state } = req.body;
// const salt = bcrypt.genSaltSync(10);
// const hash = bcrypt.hashSync(password, salt);
console.log(req.body)
db.any('INSERT INTO city(id, name, state) VALUES (uuid_generate_v4(), $1, $2);', [name, state])
    .then((data) => {
      // success;
      console.log('Success.');
      res.json(data);
    })
    .catch((error) => {
      // error;
      console.log(error);
      res.send("ERROR!")
    });
})