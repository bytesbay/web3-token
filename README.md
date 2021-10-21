![Project Presentation](https://github.com/bytesbay/web3-token/raw/main/resources/logo.jpg "Web3 Token")

# Web3 Token

Web3 Token is a new way to authenticate users. A replacement for JWT in hybrid dApps. See [this article](https://medium.com/@bytesbay/you-dont-need-jwt-anymore-974aa6196976) for more info (later I'll add this info to this readme).

## Install
```bash
$ npm i web3-token
```

## Example usage (Client side)

```js
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

---

## API

Argument | Name | Description | Required | Example
--- | --- | --- | --- | ---
1 | `signer` | A function that returns a promise with signature string eg: web3.personal.sign(`data`, `address`) | `required` | `(body) => web3.personal.sign(body, 0x23..1234)`
2 | `expire_in` | A string that represents a time span ([see ms module](https://github.com/vercel/ms)) or a number of milliseconds | `optional` (default: `1d`) | `1 day`
3 | `body` | An object that will be appended to a signature's body. Can only contain string values. Can be used for some custom data. | `optional` | `{ 'Custom-data': 'some custom data' }`

## License
Web3 Token is released under the MIT license. © 2021 Miroslaw Shpak
