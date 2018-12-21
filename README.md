# assert-extends

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/assert-extends.svg?style=flat-square
[npm-url]: https://npmjs.org/package/assert-extends
[travis-image]: https://img.shields.io/travis/node-modules/assert-extends.svg?style=flat-square
[travis-url]: https://travis-ci.org/node-modules/assert-extends
[codecov-image]: https://codecov.io/gh/node-modules/assert-extends/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/node-modules/assert-extends
[david-image]: https://img.shields.io/david/node-modules/assert-extends.svg?style=flat-square
[david-url]: https://david-dm.org/node-modules/assert-extends
[snyk-image]: https://snyk.io/test/npm/assert-extends/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/assert-extends
[download-image]: https://img.shields.io/npm/dm/assert-extends.svg?style=flat-square
[download-url]: https://npmjs.org/package/assert-extends

`power-assert` module extends.

- `assert.asyncThrows(block[, error][, message])`

Note: use [assert.rejects(asyncFn, error, message)](https://nodejs.org/api/assert.html#assert_assert_rejects_asyncfn_error_message) instead of this module at Node.js 10.x+.

## Usage

- Add `mocha --require intelli-espower-loader` to your test scripts.

### assert throws with async function

- API: `assert.asyncThrows(block[, error][, message])`, return a promise

```js
it('should throw error', () => {
  return assert.asyncThrows(function* () {
    yield fs.readFile(filepath);
  }, /not exists/);
});

it('should throw error', function* () {
  yield assert.asyncThrows(function* () {
    yield fs.readFile(filepath);
  }, /not exists/);
});

it('should throw error', done => {
  assert.asyncThrows(function* () {
    yield fs.readFile(filepath);
  }, /not exists/).then(done).catch(done);
});
```

## License

[MIT](LICENSE.txt)
