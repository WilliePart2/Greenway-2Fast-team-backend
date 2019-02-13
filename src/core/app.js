let express = require('express');

class App {
  constructor (application) {
    this._app = application;
  }
  use (...middlewareBatch) {
    middlewareBatch.forEach(middleware => {
      this._applyMiddleware(
        this._prepareMidleware(middleware)
      );
    });
  }

  /**
   * Overwrite in order to apply middleware to specific object
   * @param middleware
   * @private
   */
  _applyMiddleware (middleware) {
    this._app.use(middleware);
  }

  /**
   * This method could be overwrite for specific wrapping middleware
   * @param middleware
   * @returns {*}
   * @private
   */
  _prepareMidleware (middleware) {
    if (middleware._router) {
      return middleware._router;
    }
    return middleware;
  }
}

module.exports = App;
