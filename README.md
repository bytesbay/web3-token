![Project Presentation](https://github.com/bytesbay/web3-token/raw/main/resources/logo.jpg "Web3 Token")

# Web3 Token

Web3 Token is a new way to authenticate users. See [this article](https://medium.com/@bytesbay/you-dont-need-jwt-anymore-974aa6196976) for more info (later I'll add this info to this readme). Implementation of [EIP-4361](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-4361.md).

## Version 2 updates 🎉
- I'm now 90% following [EIP-4361](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-4361.md). Why 90%? Because i don't like some things in that standard that makes it more difficult to use it for developers.
- `body` (3rd parameter) is now deprecated.

---
## Install

With [web3](https://www.npmjs.com/package/web3) package:

```bash
$ npm i web3-token web3
```

or with [ethers](https://www.npmjs.com/package/ethers) package:

```bash
$ npm i web3-token ethers
```

---

## Example usage (Client side)

Using [Web3](https://www.npmjs.com/package/web3) package:

```js
import Web3 from 'web3';
import Web3Token from 'web3-token';

// Connection to MetaMask wallet
const web3 = new Web3(ethereum);
await ethereum.request({ method: 'eth_requestAccounts'});

// getting address from which we will sign message
const address = (await web3.eth.getAccounts())[0];

// generating a token with 1 day of expiration time
const token = await Web3Token.sign(msg => web3.eth.personal.sign(msg, address), '1d');

// attaching token to authorization header ... for example
```

Using [Ethers](https://www.npmjs.com/package/ethers) package:

```js
import { ethers } from "ethers";
import Web3Token from 'web3-token';

// Connection to MetaMask wallet
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

// generating a token with 1 day of expiration time
const token = await Web3Token.sign(async msg => await signer.signMessage(msg), '1d');

// attaching token to authorization header ... for example
```

---

## Example usage (Server side)
```js
const Web3Token = require('web3-token');

// getting token from authorization header ... for example
const token = req.headers['Authorization']

const { address, body } = await Web3Token.verify(token);

// now you can find that user by his address 
// (better to do it case insensitive)
req.user = await User.findOne({ address });
```

---

## Handle exceptions

```js
const generateToken = async () => {
  if (!window.ethereum) {
    return console.log('Please install and activate the metamask extension!');
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  try {
    return await Web3Token.sign(async msg => {
      try {
        return await signer.signMessage(msg);
      }
      catch (err) {
        const { reason } = err;
        if (reason === "unknown account #0") {
          return console.log('Have you unlocked metamask and are connected to this page?')
        }

        console.log(err.toString());
      }
    }, '1d');
  }
  catch (err) {
    if (/returns a signature/.test(err.toString())) {
      return;
    }
    console.log(err.toString());
  }
}
```

## Advanced usage with options (Client&Server side)
```js

// I assume here a lot of things to be imported 😀

const token = await Web3Token.sign(async msg => await signer.signMessage(msg), {
  domain: 'worldofdefish.com',
  statement: 'I accept the WoD Terms of Service: https://service.org/tos',
  expires_in: '3 days',
  // won't be able to use this token for one hour
  not_before: new Date(Date.now() + (3600 * 1000)),
  nonce: 11111111,
});

const { address, body } = await Web3Token.verify(token, {
  // verify that received token is signed only for our domain
  domain: 'worldofdefish.com'
});

```

---

## API

### sign(signer, options)
Name | Description | Required | Example
--- | --- | --- | ---
`signer` | A function that returns a promise with signature string eg: web3.personal.sign(`data`, `address`) | `required` | `(body) => web3.personal.sign(body, '0x23..1234')`
`options` | An options object or, if passed a string, will be used as an `expires_in` option | `optional` (default: `'1d'`) | `{}` or `'1 day'`
`options.expires_in` | A string that represents a time span ([see ms module](https://github.com/vercel/ms)) or a number of milliseconds | `optional` (default: `1d`) | `'1 day'`
`options.not_before` | A date after which the token becomes usable | `optional` | `new Date('12-12-2012')`
`options.expiration_time` | A date till when token is valid. Overwrites `expires_in` parameter | `optional` | `new Date('12-12-2012')`
`options.statement` | A human-readable ASCII assertion that the user will sign, and it must not contain `'\n'` | `optional` | `'I accept the ServiceOrg Terms of Service: https://service.org/tos'`
`options.domain` | Authority that is requesting the signing. | `optional`(Unless verifier won't ask for it) | `'example.com'`
`options.nonce` | A randomized token used to prevent replay attacks, at least 8 alphanumeric characters. | `optional` | `12345678`
`options.request_id` | A system-specific identifier that may be used to uniquely refer to the sign-in request. | `optional` | `231`


### verify(token, options)
Name | Description | Required | Example
--- | --- | --- | ---
`token` | A token string that is generated from `sign()` | `required` | `...`
`options` | An options object | `optional` | `{ domain: 'example.com' }`
`options.domain` | The domain you want to accept | `optional` | `'example.com'`

---

## License
Web3 Token is released under the MIT license. © 2021 Miroslaw Shpak
