'use strict';

/**
 * Module dependencies.
 */

const { AssertionFailedError, ValidationFailedError } = require('../src/errors');
const sign = require('../src/sign');
const should = require('should');

/**
 * Test `sign()`.
 */

describe('sign()', () => {
  it('should throw an error if `algorithm` is missing', () => {
    try {
      sign();

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(AssertionFailedError);
      e.errors.algorithm.show().assert.should.equal('HaveProperty');
    }
  });

  it('should throw an error if `algorithm` is invalid', () => {
    try {
      sign({}, { algorithm: 'foobar' });

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(AssertionFailedError);
      e.errors.algorithm[0].show().assert.should.equal('Choice');
    }
  });

  it('should throw an error if `headers` is missing', () => {
    try {
      sign({}, { algorithm: 'ed25519' });

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(ValidationFailedError);
      e.errors.headers.show().assert.should.equal('HaveProperty');
    }
  });

  it('should throw an error if `headers` is invalid', () => {
    try {
      sign({ headers: 'foobar' }, { algorithm: 'ed25519' });

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(ValidationFailedError);
      e.errors.headers[0].show().assert.should.equal('PlainObject');
    }
  });

  it('should throw an error if `keyId` is missing', () => {
    try {
      sign({}, { algorithm: 'ed25519' });

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(ValidationFailedError);
      e.errors.keyId.show().assert.should.equal('HaveProperty');
    }
  });

  it('should throw an error if `keyId` is invalid', () => {
    try {
      sign({ keyId: {} }, { algorithm: 'ed25519' });

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(ValidationFailedError);
      e.errors.keyId[0].show().assert.should.equal('NotBlank');
    }
  });

  it('should throw an error if `secretKey` is missing', () => {
    try {
      sign({}, { algorithm: 'ed25519' });

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(ValidationFailedError);
      e.errors.secretKey.show().assert.should.equal('HaveProperty');
    }
  });

  it('should throw an error if `secretKey` is invalid', () => {
    try {
      sign({ secretKey: 'foobar' }, { algorithm: 'ed25519' });

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(ValidationFailedError);
      e.errors.secretKey[0].show().assert.should.equal('Regexp');
    }
  });

  it('should return an http signature', () => {
    const signature = sign({
      headers: {
        foo: 'bar'
      },
      keyId: 'primary',
      secretKey: '96aa9ec42242a9a62196281045705196a64e12b15e9160bbb630e38385b82700e7876fd5cc3a228dad634816f4ec4b80a258b2a552467e5d26f30003211bc45d'
    }, { algorithm: 'ed25519' });

    signature.should.equal('keyId="primary",algorithm="ed25519",headers="foo",signature="RbGSX1MttcKCpCkq9nsPGkdJGUZsAU+0TpiXJYkwde+0ZwxEp9dXO3v17DwyGLXjv385253RdGI7URbrI7J6DQ=="');
  });
});
