'use strict';

/**
 * Module dependencies.
 */

const { AssertionFailedError, ValidationFailedError } = require('../src/errors');
const should = require('should');
const verify = require('../src/verify');

/**
 * Test `verify()`.
 */

describe('verify()', () => {
  it('should throw an error if `algorithms` is invalid', () => {
    try {
      verify({}, { algorithms: 'foobar' });

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(AssertionFailedError);
      e.errors.algorithms[0].show().assert.should.equal('Collection');
    }
  });

  it('should throw an error if `headers.signature` is missing', () => {
    try {
      verify({ headers: {} });

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(ValidationFailedError);
      e.errors.headers.signature.show().assert.should.equal('HaveProperty');
    }
  });

  it('should throw an error if `headers.signature` is invalid', () => {
    try {
      verify({ headers: { signature: {} } });

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(ValidationFailedError);
      e.errors.headers.signature[0].show().assert.should.equal('NotBlank');
    }
  });

  it('should throw an error if `publicKey` is missing', () => {
    try {
      verify({});

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(ValidationFailedError);
      e.errors.publicKey.show().assert.should.equal('HaveProperty');
    }
  });

  it('should throw an error if `publicKey` is invalid', () => {
    try {
      verify({ publicKey: 'foobar' });

      should.fail();
    } catch (e) {
      e.should.be.instanceOf(ValidationFailedError);
      e.errors.publicKey[0].show().assert.should.equal('Regexp');
    }
  });

  it('should return an object if verification failed', () => {
    const signature = verify({
      headers: {
        foo: 'bar',
        signature: 'keyId="primary",algorithm="ed25519",headers="foo",signature="AaAAAAAaaaAAaAaaaaaAAaaAAAAaaa+AAAAAAAAAAA+AAAAAAAAAAAAAAAAyGLXjv385253RdGI7URbrI7J6DQ=="'
      },
      publicKey: 'e7876fd5cc3a228dad634816f4ec4b80a258b2a552467e5d26f30003211bc45d'
    });

    signature.should.eql({ verified: false });
  });

  it('should return an http signature if the verification was successful', () => {
    const signature = verify({
      headers: {
        foo: 'bar',
        signature: 'keyId="primary",algorithm="ed25519",headers="foo",signature="RbGSX1MttcKCpCkq9nsPGkdJGUZsAU+0TpiXJYkwde+0ZwxEp9dXO3v17DwyGLXjv385253RdGI7URbrI7J6DQ=="'
      },
      publicKey: 'e7876fd5cc3a228dad634816f4ec4b80a258b2a552467e5d26f30003211bc45d'
    });

    signature.should.eql({
      algorithm: 'ed25519',
      headers: ['foo'],
      keyId: 'primary',
      signature: 'RbGSX1MttcKCpCkq9nsPGkdJGUZsAU+0TpiXJYkwde+0ZwxEp9dXO3v17DwyGLXjv385253RdGI7URbrI7J6DQ==',
      verified: true
    });
  });
});
