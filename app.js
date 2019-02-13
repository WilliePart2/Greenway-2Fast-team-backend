let express = require('express');
let bodyParser = require('body-parser');
let morgan = require('morgan');
let cors = require('cors');
let mongoose = require('mongoose');
let App = require('./src/core');
let { SERVER_PORT, DB } = require('./config/app_config');

let mongo = mongoose.connect(DB)
  .then(() => console.log('Db connected successfully'))
  .catch(e => {
    console.error(e);
    console.log('\nDb collection failed\n');
  });

let app = express();
/**
 * Application wrapper initialization
 */
let core = new App(app);

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
