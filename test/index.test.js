'use strict';

const assert = require('..');

describe('assert extends', () => {
  describe('assert()', () => {
    it('should assert pass', () => {
      assert(1);
      assert(true);
    });
  });

  describe('match()', () => {
    it('should match with string', () => {
      assert.match('foo', 'f');
      assert.match('foo hi bar', 'hi');

      assert.throws(() => {
        assert.match('foo hi bar', 'hihi');
      }, /Expect "foo hi bar" match "hihi"/);
    });

    it('should match with RegExp', () => {
      assert.match('foo', /^f/);
      assert.match('foo hi bar', /hi/);

      assert.throws(() => {
        assert.match('foo hi bar', /hihi/);
      }, /Expect "foo hi bar" match \/hihi\//);
    });

    it('should throw TypeError when expected invalid', () => {
      assert.throws(() => {
        assert.match('foo', 1);
      }, /^TypeError: expected value should be RegExp or String, but got 1$/);
    });
  });

  describe('asyncThrows()', () => {
    it('should work with generator', () => {
      return assert.asyncThrows(function* () {
        throw new Error('mock error');
      }, /mock error/);
    });

    it('should work with promise', () => {
      return assert.asyncThrows(() => {
        return new Promise((resolve, reject) => {
          reject(new Error('mock error'));
        });
      }, /mock error/);
    });

    it('should work with thunk', () => {
      return assert.asyncThrows(() => {
        return callback => {
          callback(new Error('mock error'));
        };
      }, /mock error/);
    });

    it('should work with mocha-thunk', function* () {
      yield assert.asyncThrows(function* () {
        throw new Error('mock error');
      }, /mock error/);
    });

    it('should work when error is Error', () => {
      return assert.asyncThrows(function* () {
        throw new Error('mock error');
      }, Error);
    });

    it('should work when error missing', () => {
      return assert.asyncThrows(function* () {
        throw new Error('mock error');
      });
    });

    it('should throw orginal error when assert error function fail', () => {
      return assert.asyncThrows(function* () {
        throw new Error('mock error');
      }, err => {
        return err.message === 'mock';
      }).catch(err => {
        assert.equal(err.name, 'Error');
        assert.match(err.message, 'mock error');
      });
    });

    it('should pass when assert error function pass', () => {
      return assert.asyncThrows(function* () {
        throw new Error('mock error');
      }, err => {
        return err.message === 'mock error';
      });
    });

    it('should throw when error missing', () => {
      return assert.asyncThrows(function* () {
        return 1 + 1;
      }).catch(err => {
        assert.equal(err.name, 'AssertionError');
        assert.equal(err.message, 'Missing expected exception.');
      });
    });

    it('should throw when error exists', () => {
      return assert.asyncThrows(function* () {
        return 1 + 1;
      }, /foo/, 'foo message').catch(err => {
        assert.equal(err.name, 'AssertionError');
        assert.equal(err.message, 'foo message');
      });
    });

    it('should throw when error missing and TypeError', () => {
      return assert.asyncThrows(function* () {
        return 1 + 1;
      }, TypeError).catch(err => {
        assert.equal(err.name, 'AssertionError');
        assert.equal(err.message, 'Missing expected exception. TypeError');
      });
    });

    it('should throw when error missing and RegExp', () => {
      return assert.asyncThrows(function* () {
        return 1 + 1;
      }, /foo/).catch(err => {
        assert.equal(err.name, 'AssertionError');
        assert.equal(err.message, 'Missing expected exception. /foo/');
      });
    });
  });
});
