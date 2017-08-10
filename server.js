require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());


app.use(express.static('public'))

// mongoose.connect(process.env.DB_URL, (err, database) => {
  // if(err) { console.error(err); }
  // else { 
    app.listen(process.env.PORT, () => { console.log(`listening on port: ${process.env.PORT}`) })
  // }
// });

const Users = mongoose.Schema({
  name: String,
  email: String,
  picture: String,
})

const User = mongoose.model('user', Users);


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/login.html'));
});

app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'home.html'));
})

app.post('/login', (req, res) => {
  console.log(req.body, 'user data')
  new User({
    name: req.body.name,
    email: req.body.email,
    picture: req.body.picture,
  })
  res.sendStatus(200)
})




