const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const { SERVER_PORT, DB } = require('./config/app_config');

let mongo = mongoose.connect(DB)
  .then(() => console.log('Db connected successfully'))
  .catch(e => {
    console.error(e);
    console.log('\nDb collection failed\n');
  });

let app = express();
app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res) => {
  res.send('Hello world');
});

app.listen(SERVER_PORT, () => {
  console.log(`Sever running on ${SERVER_PORT} port`);
});
