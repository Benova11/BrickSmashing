const express = require('express');
const path = require('path');
const hbs = require('hbs');
//require('./bigO');

const app = express();

const publicDirpath = path.join(__dirname, '../public');

app.set('view engine', 'hbs');
app.use(express.static(publicDirpath));

app.get('', (req, res) => {
  res.render('index');
});

app.listen(3000, () => {
  console.log('Server is up on port: 3000');
});
