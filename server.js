require('dotenv').config();
const express = require('express');

const app = express();
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const request = require('request');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());


app.use(express.static('public'));



mongoose.connect(process.env.DB_URL, (err) => {
  if(err) { console.error(err); }
  app.listen(process.env.PORT, () => { console.log(`listening on port: ${process.env.PORT}`); });

});

const Users = mongoose.Schema({
  name: String,
  email: String,
  picture: String,
});

const Scores = mongoose.Schema({
  card: String,
  score: Number,
});

const User = mongoose.model('user', Users);
const Score = mongoose.model('score', Scores);

app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/home.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/login.html'));
});

app.post('/login', (req, res) => {
  console.log(req.body, 'user data');
  // new User({
  //   name: req.body.name,
  //   email: req.body.email,
  //   picture: req.body.picture,
  // })
  res.sendStatus(200);
});

app.post('/score', (req, res) => {
  console.log(req.body);
});

app.post('/search', (req, res) => {
  console.log(req.body.searchTerm);
  request({
    method: 'GET',
    uri:`https://tastedive.com/api/similar?q=${req.body.searchTerm}&k=${process.env.TASTE_DIVE_API}&limit=10`}, (err, response, body) => {
    if (err) { 
      console.error(err);
    }
    const parseResult = JSON.parse(response.body);
    const data = parseResult.Similar.Results;
    console.log(data);
    res.send(data);
  }) 
});
