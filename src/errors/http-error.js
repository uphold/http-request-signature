'use strict';

/**
 * Module dependencies.
 */

const StandardError = require('standard-http-error');

/**
 * Export `HttpError`.
 */

module.exports = class HttpError extends StandardError {
  constructor({ code, message, properties }) {
    super(code, message, properties);
  }
};
