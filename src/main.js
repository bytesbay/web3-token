import Web3Token from './lib';

const test = async () => {

  // Connection to MetaMask wallet
  const web3 = new Web3(ethereum);
  await ethereum.request({ method: 'eth_requestAccounts'});

  // getting address from which we will sign message
  const your_address = (await web3.eth.getAccounts())[0];

  // getting a token
  const token = await Web3Token.sign(msg => web3.eth.personal.sign(msg, your_address), {
    domain: 'worldofdefish.com',
    statement: 'Hey guys!',
    not_before: new Date(Date.now() - (24 * 60 * 60 * 1000)),
  });

  console.log('TOKEN CREATED', token);

  const { address, body } = await Web3Token.verify(token, { domain: 'worldofdefish.com' });

  console.log('ADDRESS RECOVERED', address, body);
}

document.querySelector('#btn').addEventListener('click', () => test())