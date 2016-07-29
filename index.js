'use strict';

const assert = require('power-assert');
const co = require('co');

assert.asyncThrows = (block, error, message) => {
  return co(function* () {
    let throwError = false;
    try {
      yield block();
    } catch (err) {
      throwError = true;
      return assert.throws(() => {
        throw err;
      }, error, message);
    }

    if (!message) {
      message = 'Missing expected exception.';
      if (error) {
        message += ' ' + (error instanceof RegExp ? error : error.name);
      }
    }
    assert(throwError, message);
  });
};

module.exports = assert;
