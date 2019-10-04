# http-request-signature
An HTTP signature parser and generator fully compliant with the proposed "Signing HTTP Messages" [Internet Draft](https://www.ietf.org/id/draft-cavage-http-signatures-07.txt).

## Status
[![npm version][npm-image]][npm-url] [![build status][travis-image]][travis-url]

## Usage

### Signing an HTTP message

```js
const { sign } = require('http-request-signature');
const signature = sign({
  headers: {
    '(request-target)': 'post /foo',
    date: '2017-09-01T15:04:17.555Z',
    digest: 'SHA-256=X48E9qOokqqrvdts8nOJRJN3OWDUoyWxBf7kbu9DBPE='
  },
  keyId: 'primary',
  secretKey: '96aa9ec42242a9a62196281045705196a64e12b15e9160bbb630e38385b82700e7876fd5cc3a228dad634816f4ec4b80a258b2a552467e5d26f30003211bc45d'
}, { algorithm: 'ed25519' });

// Result: `keyId="primary",algorithm="ed25519",headers="(request-target) date digest",signature="MSd6OVEG4bZ/ClBSKApzqC1UbUkPclq9PyLwWv1//Br2YouqOb1T6izcOPWPY9scxWSfLHR4m6d/HThm7MX7Dw=="`
```

### Verifying an HTTP message

```js
const { verify } = require('http-request-signature');
const result = verify({
  headers: {
    '(request-target)': 'post /foo',
    date: '2017-09-01T15:04:17.555Z',
    digest: 'SHA-256=X48E9qOokqqrvdts8nOJRJN3OWDUoyWxBf7kbu9DBPE='
    signature: 'keyId="primary",algorithm="ed25519",headers="(request-target) date digest",signature="MSd6OVEG4bZ/ClBSKApzqC1UbUkPclq9PyLwWv1//Br2YouqOb1T6izcOPWPY9scxWSfLHR4m6d/HThm7MX7Dw=="'
  },
  publicKey: 'e7876fd5cc3a228dad634816f4ec4b80a258b2a552467e5d26f30003211bc45d'
}, { algorithm: 'ed25519' });

// Result:
// {
//   algorithm: 'ed25519',
//   headers: ['(request-target)', 'date', 'digest'],
//   keyId: 'primary',
//   signature: 'MSd6OVEG4bZ/ClBSKApzqC1UbUkPclq9PyLwWv1//Br2YouqOb1T6izcOPWPY9scxWSfLHR4m6d/HThm7MX7Dw==',
//   verified: true
// }
```

## Supported algorithms

Only the `ed25519` algorithm is supported at this time.

## Release
```sh
npm version [<new-version> | major | minor | patch] -m "Release %s"
```

## License
MIT


[npm-image]: https://img.shields.io/npm/v/http-request-signature.svg
[npm-url]: https://npmjs.org/package/http-request-signature
[travis-image]: https://travis-ci.org/uphold/http-request-signature.svg?branch=master
[travis-url]: https://travis-ci.org/uphold/http-request-signature