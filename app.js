const express = require('express');
const { SERVER_PORT } = require('./config/app_config');

let app = express();

app.use((req, res) => {
  res.send('Hello world');
});


app.listen(SERVER_PORT, () => {
  console.log(`Sever running on ${SERVER_PORT} port`);
});
