import Base64 from 'base-64';
import { timeSpan } from './timespan';

/**
 * 
 * @param {Web3|function} signer - The signer, may be either a Web3 instance or ethersjs instance (in future)
 * @param {any} body - Body to add to the sign
 */
export const sign = async (signer, expires_in = '1w', body = {}) => {

  const expires_in_date = timeSpan(expires_in);

  validateInput(body);

  const data = {
    'Web3-Token-Version': 1,
    'Expire-Date': expires_in_date,
    ...body,
  };

  const msg = buildMessage(data);
  
  if(typeof signer === 'function') {
    var signature = await signer(msg);
  } else {
    new Error('"signer" argument should be a function that returns a signature eg: "msg => web3.eth.personal.sign(msg, <YOUR_ADDRESS>)"')
  }

  if(typeof signer !== 'string') {
    new Error('"signer" argument should return a Promise that returns signature string')
  }

  const token = Base64.encode(JSON.stringify({
    signature,
    body: msg,
  }))

  return token;
}


const validateInput = body => {

};

const buildMessage = data => {
  const message = [];
  for (const key in data) {
    message.push(`${key}: ${data[key]}`)
  }
  return message.join('\n');
};