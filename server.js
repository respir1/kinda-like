require('dotenv').config();
const express = require('express');

const app = express();
const path = require('path');
const cors = require('cors');
const request = require('request');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(express.static('public'));

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

mongoose.connect(process.env.DB_URL, (err) => {
  if (err) { 
    console.error(err);
  } 
  console.log('connected to MONGODB');
  app.listen(process.env.PORT, () => { console.log(`listening on port: ${process.env.PORT}`); });
});

const db = mongoose.connection;

const Users = new Schema({
  name: String,
  email: String,
  picture: String,
});

const Scores = new Schema({
  userId: String,
  score: Number,
  gameTitle: String,
  date: { type: Date, default: Date.now },
});

const User = mongoose.model('user', Users);
const Score = mongoose.model('score', Scores);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/login.html'));
});

app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/home.html'));
});

app.post('/users', (req, res) => {
  User.findOne({ name: req.body.name }, (err, user) => {
    if (err) {
      console.error(err);
    }
    console.log(user);
    if (!user.name) {
      new User({
        name: req.body.name,
        email: req.body.email,
        picture: req.body.picture,
      }).save((err) => {
        if (err) {
          console.error(err);
        }
        res.send('new user saved');
      });
    }
    if (user) {
      res.send(user);
    }
  });
});

app.post('/scores', (req, res) => {
  console.log(req.body);
  new Score({
    userId: req.body.userId,
    score: req.body.score,
    gameTitle: req.body.gameTitle,
  }).save((err, score) => {
    if (err) {
      console.log(err);
    }
    res.send(score);
  });
});

app.get('/scores', (req, res) => {
  Score.find(req.query).limit(5).sort({ date: -1 }).exec((err, scores) => {
    if (err) {
      console.error(err);
    }
    console.log(scores, 'scores');
    res.send(scores);
  });
});

app.post('/search', (req, res) => {
  console.log(req.body.searchTerm);
  request({
    method: 'GET',
    uri:`https://tastedive.com/api/similar?q=${req.body.searchTerm}&k=${process.env.TASTE_DIVE_API}&limit=20`}, (err, response, body) => {
    if (err) { 
      console.error(err);
    }
    const parseResult = JSON.parse(response.body);
    const data = parseResult.Similar.Results;
    console.log(data);
    res.send(data);
  });
});
