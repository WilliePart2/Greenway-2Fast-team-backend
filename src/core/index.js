let Action = require('./action');
let InnerRouter = require('./router');
let App = require('./app');
let express = require('express');

let Router = () => {
  return new InnerRouter(express.Router());
};

module.exports = {
  Action,
  Router,
  App
};
