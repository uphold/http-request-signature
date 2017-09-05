'use strict';

/**
 * Module dependencies.
 */

const AssertionFailedError = require('./assertion-failed-error');
const HttpError = require('./http-error');
const ValidationFailedError = require('./validation-failed-error');

/**
 * Export named errors.
 */

module.exports = {
  AssertionFailedError,
  HttpError,
  ValidationFailedError
};
