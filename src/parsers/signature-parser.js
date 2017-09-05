'use strict';

/**
 * Regular expressions.
 */

const SIGNATURE = /(\w+)="([^"]*)",*/g;

/**
 * Parse signature.
 */

module.exports = function parse(signature) {
  const result = {};

  signature.replace(SIGNATURE, (match, key, value) => { result[key] = value; });

  return result;
};
