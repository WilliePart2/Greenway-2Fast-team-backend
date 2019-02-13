const { TResponse } = require('./coreTypes');

class Action {
  constructor (req, res, next) {
    this._request = req;
    this._response = res;
    this._next = next;
  }

  execute () {
    let response = this.run(this._request, this._response, this._next);
    if (response) {
      if (!(response instanceof Promise)) {
        console.warn('You should return only promise from "run" method');
        return;
      }

      response.then(data => this.send(TResponse.SUCCESS, data))
        .catch(e => {
          console.log('Error happened');
          console.log(e);
          this.send(TResponse.ERROR, e);
        });
    }
  }

  /**
   * This method should be overwrite in order to provide request handling
   * @abstract
   */
  run (req, res, next) {}

  sendSuccess (responseData) {
    this._response.status = 200;
    this._response.json(responseData);
  }

  sendError (errorData) {
    this._response.status = 500;
    this._response.json(errorData);
  }

  sendPermissionDenied (descriptiveInformation) {
    this._response.status = 401;
    this._response.json(descriptiveInformation);
  }

  sendBadRequest (descriptiveInformation) {
    this._response.status = 400;
    this._response.json(descriptiveInformation);
  }

  sendNotFound () {
    this._response.status = 404;
    this._response.end();
  }

  send (responseType, responseData) {
    switch (responseType) {
      case TResponse.SUCCESS:
        this.sendSuccess(responseData);
        break;
      case TResponse.ERROR:
        this.sendError(responseData);
        break;
      case TResponse.BAD_REQUEST:
        this.sendBadRequest(responseData);
        break;
      case TResponse.NOT_FOUND:
        this.sendNotFound();
        break;
      case TResponse.UNAUTHORIZED:
        this.sendPermissionDenied(responseData);
        break;
    }
  }
}

module.exports = Action;