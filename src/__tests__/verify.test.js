import { sign, verify } from '@/lib';
import { ethers as Ethers } from 'ethers';

const mnemonic_instance = Ethers.Wallet.fromMnemonic(process.env['ACCOUNT_MNEMONIC']);
const ethers_provider = new Ethers.providers.JsonRpcProvider(process.env['CHAIN_PROVIDER_URL']);
const ethers_signer = new Ethers.Wallet(
  mnemonic_instance.privateKey, 
  ethers_provider
);

describe('Verify method', () => {

  let token = '';
  let real_address = ethers_signer.address.toUpperCase();
  const custom_field_value = 'some custom value'

  it('prepearing token', async () => {
    token = await sign(body => ethers_signer.signMessage(body), '1d', {
      'Custom-field': custom_field_value
    });

    expect(token).toBeTruthy();
  });

  it('must verify a signature', async () => {
    const { address, body } = await verify(token);

    expect(address).toEqual(real_address);
    expect(body['custom-field']).toEqual(custom_field_value);
  });

  it('must verify a signature', async () => {
    expect(() => verify('qweqwe')).toThrowError()
  });
})