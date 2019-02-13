let action = require('./action');
let App = require('./app');

class Router extends App {
  constructor (expressRouter) {
    super();
    this._router = expressRouter;
  }

  _applyMiddleware (middleware) {
    this._router.use(middleware);
  }

  _prepareMidleware (middleware) {
    let handlerFn = middleware;

    if (middleware instanceof  action) {
      handlerFn = (req, res, next) => {
        (new action(req, res, next)).execute();
      }
    }
    else if (middleware instanceof Router) {
      handlerFn = middleware._router;
    }

    return handlerFn;
  }
}

module.exports = Router;
