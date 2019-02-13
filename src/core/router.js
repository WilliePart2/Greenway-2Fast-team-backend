const action = require('./action');

class Router {
  constructor (expressRouter) {
    this._router = expressRouter;
  }

  use (...requestHandlingParams) {
    let route = requestHandlingParams.shift();
    let handlersArr = [];

    if (typeof route !== 'string') {
      requestHandlingParams.unshift(route);
      route = null;
    } else {
      handlersArr.push(route);
    }

    requestHandlingParams.forEach(requestHandler => {
      let handlerFn = requestHandler;
      if (requestHandler instanceof  action) {
        handlerFn = (req, res, next) => {
          (new action(req, res, next)).execute();
        }
      }
      handlersArr.push(handlerFn);
    });

    this._router.use(...handlersArr);
  }
}

module.exports = Router;
