'use strict';

/**
 * Module dependencies.
 */

const { merge } = require('lodash');
const { Assert, Constraint, Validator } = require('validator.js');
const { AssertionFailedError, ValidationFailedError } = require('./errors');
const customAsserts = require('./asserts');
const debugnyan = require('debugnyan');
const extraAsserts = require('validator.js-asserts');

/**
 * Instances.
 */

const asserts = merge({}, extraAsserts, customAsserts);
const logger = debugnyan('http-request-signature:validator');
const validator = new Validator();

/**
 * Export `Assert`.
 */

const is = Assert.extend(asserts);

/**
 * Assert.
 */

function assert(data, constraints) {
  const errors = validator.validate(data, new Constraint(constraints, { deepRequired: true }));

  if (errors !== true) {
    logger.error({ errors }, 'Assertion failed');

    throw new AssertionFailedError({ properties: { data, errors } });
  }
}

/**
 * Validate.
 */

function validate(data, constraints) {
  const errors = validator.validate(data, new Constraint(constraints, { deepRequired: true }));

  if (errors !== true) {
    logger.warn({ errors }, 'Validation failed');

    throw new ValidationFailedError({ properties: { data, errors } });
  }
}

/**
 * Export validation functions.
 */

module.exports = { assert, is, validate };
