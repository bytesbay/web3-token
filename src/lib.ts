import { sign } from './lib/sign/sign';
import { verify } from './lib/verify/verify';

const Web3Token = {
  sign,
  verify,
}

export default Web3Token;
export { sign, verify };