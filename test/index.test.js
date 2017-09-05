'use strict';

/**
 * Module dependencies.
 */

require('should');

const index = require('../src/index');

/**
 * Test `index`.
 */

describe('index', () => {
  it('should export an enums object', () => {
    index.enums.should.be.an.instanceOf(Object);
  });

  it('should export an errors object', () => {
    index.errors.should.be.an.instanceOf(Object);
  });

  it('should export a `sign()` function', () => {
    index.sign.should.be.an.instanceOf(Function);
  });

  it('should export a `verify()` function', () => {
    index.verify.should.be.an.instanceOf(Function);
  });
});
