import { sign } from './lib/sign/sign';
import { verify } from './lib/verify/verify';
import { decrypt } from './lib/decrypt/decrypt';

const Web3Token = {
  sign,
  decrypt,
  verify,
}

export default Web3Token;
export { sign, decrypt, verify };