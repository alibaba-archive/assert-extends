'use strict';

const assert = require('assert');
const util = require('util');
const co = require('co');

function assertExt() {
  return assert.apply(assert, arguments);
}

for (const key in assert) {
  assertExt[key] = assert[key];
}

assertExt.match = (value, expected, message) => {
  message = message || util.format('Expect %j match %s', value,
    expected instanceof RegExp ? expected : JSON.stringify(expected));
  if (typeof expected === 'string') {
    assert(value.indexOf(expected) >= 0, message);
  } else if (expected instanceof RegExp) {
    assert(expected.test(value), message);
  } else {
    throw new TypeError(`expected value should be RegExp or String, but got ${expected}`);
  }
};

assertExt.asyncThrows = (block, error, message) => {
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

module.exports = assertExt;
