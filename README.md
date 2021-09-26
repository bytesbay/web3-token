![Project Presentation](resources/logo.jpg "Web3 Token")

# Web3 Token

Web3 Token is a new way to authenticate users. A replacement for JWT.

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

// getting a token
const token = await Web3Token.sign(msg => web3.eth.personal.sign(msg, address), '1d');

// attaching token to authorization header ... for example
```

## Example usage (Server side)
```js
import Web3Token from 'web3-token';

// getting token from authorization header ... for example

const { address, body } = await Web3Token.verify(token);

// now you can find that user by his address (better to do it case insensitive)
req.user = await User.findOne({ address });
```

## License
Web3 Token is released under the MIT license. © 2021 Miroslaw Shpak
