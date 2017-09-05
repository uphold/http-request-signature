'use strict';

/**
 * Module dependencies.
 */

const HttpError = require('./http-error');

/**
 * `AssertionFailedError`.
 */

module.exports = class AssertionFailedError extends HttpError {
  constructor({ properties }) {
    super({ code: 500, message: 'Assertion Failed', properties });
  }
};
