const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const config = require('./config');

let app = express();
app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(config.SERVER_PORT, () => {
    console.log(`Server listen on ${config.SERVER_PORT} port`);
});
