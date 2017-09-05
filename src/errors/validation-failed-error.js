'use strict';

/**
 * Module dependencies.
 */

const HttpError = require('./http-error');

/**
 * `ValidationFailedError`.
 */

module.exports = class ValidationFailedError extends HttpError {
  constructor({ properties }) {
    super({ code: 400, message: 'Validation Failed', properties });
  }
};
