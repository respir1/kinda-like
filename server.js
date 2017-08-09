require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')


app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use(express.static('public'))

app.use('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(process.env.PORT, () => {
  console.log(`port is listening in on ${process.env.PORT}`);
})


