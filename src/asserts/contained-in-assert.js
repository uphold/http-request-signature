'use strict';

/**
 * Module dependencies.
 */

const { difference } = require('lodash');
const { Validator, Violation } = require('validator.js');

/**
 * Export `ContainedInAssert`.
 */

module.exports = function(values) {
  this.__class__ = 'ContainedIn';

  this.validate = function(value) {
    if (!Array.isArray(value)) {
      throw new Violation(this, value, { value: Validator.errorCode.must_be_an_array });
    }

    const missing = difference(value, values);

    if (missing.length > 0) {
      throw new Violation(this, value, { missing });
    }

    return true;
  };

  return this;
};
