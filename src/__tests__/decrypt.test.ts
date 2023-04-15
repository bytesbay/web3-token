import { sign, decrypt, verify } from '../lib';
import * as Ethers from 'ethers';

// @ts-ignore
const mnemonic = Ethers.Mnemonic.fromPhrase(process.env['ACCOUNT_MNEMONIC']);
const mnemonic_instance = Ethers.HDNodeWallet.fromMnemonic(mnemonic);
const ethers_provider = new Ethers.JsonRpcProvider(process.env['CHAIN_PROVIDER_URL']);
const ethers_signer = new Ethers.Wallet(
  mnemonic_instance.privateKey, 
  ethers_provider
);

const default_token = {
  domain: 'worldofdefish.com',
  statement: 'Test',
  expiration_time: new Date(Date.now() + (3600 * 1000)),
  not_before: new Date(Date.now() - 1),
}

describe('Decrypt method', () => {

  const real_address = ethers_signer.address.toLowerCase();

  it('must return decrypted token', async () => {
    const token = await sign(body => ethers_signer.signMessage(body), { ...default_token })
    
    const decryptedToken = decrypt(token);

    expect(decryptedToken.address).toEqual(real_address);
  });
  
  
  it('must throw error of malformed token', async () => {
    expect(() => decrypt('qweqwe')).toThrowError()
  });

})