'use strict';

/**
 * Module dependencies.
 */

const { SUPPORTED_ALGORITHMS } = require('./enums');
const { assert, is, validate } = require('./validator');
const nacl = require('tweetnacl');

/**
 * Regular expressions.
 */

const ED25519_SECRET_KEY = /^[A-Fa-f0-9]{128}$/;

/**
 * Sign the `message` with the given `secretKey`.
 */

module.exports = function sign({ headers: requestHeaders, keyId, secretKey } = {}, { algorithm } = {}) {
  assert({ algorithm }, {
    algorithm: [is.required(), is.choice(SUPPORTED_ALGORITHMS)]
  });

  validate({ headers: requestHeaders, keyId, secretKey }, {
    headers: [is.required(), is.plainObject()],
    keyId: [is.required(), is.notBlank()],
    secretKey: [is.required(), is.regexp(ED25519_SECRET_KEY)]
  });

  const headers = Object.keys(requestHeaders).join(' ');
  const message = Object.entries(requestHeaders)
    .map(([key, value]) => `${key}: ${value}`)
    .join('\n');

  // Generate signature using the ed25519 algorithm.
  const signature = Buffer.from(nacl.sign.detached(
    Buffer.from(message),
    Buffer.from(secretKey, 'hex')
  )).toString('base64');

  // Return a signature in the format described by `draft-cavage-http-signatures-07` internet draft.
  return `keyId="${keyId}",algorithm="${algorithm}",headers="${headers}",signature="${signature}"`;
};
