'use strict';

/**
 * Module dependencies.
 */

const { SUPPORTED_ALGORITHMS } = require('./enums');
const { assert, is, validate } = require('./validator');
const nacl = require('tweetnacl');
const parse = require('./parsers/signature-parser');

/**
 * Regular expressions.
 */

const BASE64 = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)$/;
const ED25519_PUBLIC_KEY = /^[A-Fa-f0-9]{64}$/;

/**
 * Verify the signed `message` with the given `publicKey`.
 */

module.exports = function verify({ headers: requestHeaders, publicKey } = {}, { algorithms = SUPPORTED_ALGORITHMS } = {}) {
  assert({ algorithms }, {
    algorithms: [is.required(), is.collection(is.choice(SUPPORTED_ALGORITHMS))]
  });

  validate({ headers: requestHeaders, publicKey }, {
    headers: {
      signature: [is.required(), is.notBlank()]
    },
    publicKey: [is.required(), is.regexp(ED25519_PUBLIC_KEY)]
  });

  // Parse a signature in the format described by `draft-cavage-http-signatures-07` internet draft.
  const { algorithm, headers: signatureHeaders = 'date', keyId, signature } = parse(requestHeaders.signature);
  const headers = signatureHeaders.split(' ');

  validate({ algorithm, headers, keyId, signature }, {
    algorithm: [is.required(), is.choice(algorithms)],
    headers: is.containedIn(Object.keys(requestHeaders)),
    keyId: [is.required(), is.notBlank()],
    signature: [is.required(), is.regexp(BASE64)]
  });

  const message = headers
    .map(header => `${header}: ${requestHeaders[header]}`)
    .join('\n');

  // Verify the signature using the ed25519 algorithm.
  const verified = nacl.sign.detached.verify(
    Buffer.from(message),
    Buffer.from(signature, 'base64'),
    Buffer.from(publicKey, 'hex')
  );

  if (!verified) {
    return { verified };
  }

  return { algorithm, headers, keyId, signature, verified };
};
