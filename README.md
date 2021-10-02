![Project Presentation](https://github.com/bytesbay/web3-token/raw/main/resources/logo.jpg "Web3 Token")

# Web3 Token

Web3 Token is a new way to authenticate users. A replacement for JWT in hybrid dApps.

## Install
```bash
$ npm i web3-token
```

## Example usage (Client side)

```js
import Web3Token from 'web3-token';

// Connection to MetaMask wallet
const web3 = new Web3(ethereum);
await ethereum.enable();

// getting address from which we will sign message
const address = (await web3.eth.getAccounts())[0];

// generating a token with 1 day of expiration time
const token = await Web3Token.sign(msg => web3.eth.personal.sign(msg, address), '1d');

// attaching token to authorization header ... for example
```

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

## API

Argument | Name | Description | Required | Example
--- | --- | ---
1 | `signer` | A function that returns a promise with signature string eg: web3.personal.sign(`data`, `address`) | `required` | `(body) => web3.personal.sign(body, 0x23..1234)`
2 | `expire_in` | A string that represents a time span ([see ms module](https://github.com/vercel/ms)) or a number of milliseconds | `optional` (default: `1d`) | `1 day`
3 | `body` | An object that will be appended to a signature's body. Can only contain string values. Can be used for some custom data. | `optional` | `{ 'Custom-data': 'some custom data' }`

## License
Web3 Token is released under the MIT license. © 2021 Miroslaw Shpak
