import Web3Token from './lib';

const test = async () => {

  const web3 = new Web3(ethereum);
  await ethereum.enable();

  const address = (await web3.eth.getAccounts())[0];

  const token = await Web3Token.sign(msg => web3.eth.personal.sign(msg, address), '1d');

  console.log('TOKEN CREATED', token);

  const { address: rec_address, body } = await Web3Token.verify(token);

  console.log('ADDRESS RECOVERED', rec_address, body);
}

document.querySelector('#btn').addEventListener('click', () => test())