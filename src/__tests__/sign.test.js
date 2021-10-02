import { sign, verify } from '@/lib';
import { ethers as Ethers } from 'ethers';

const mnemonic_instance = Ethers.Wallet.fromMnemonic(process.env['ACCOUNT_MNEMONIC']);
const ethers_provider = new Ethers.providers.JsonRpcProvider(process.env['CHAIN_PROVIDER_URL']);
const ethers_signer = new Ethers.Wallet(
  mnemonic_instance.privateKey, 
  ethers_provider
);

describe('Sign method', () => {

  let token = '';
  const custom_field_value = 'some custom value'

  it('generate token', async () => {
    token = await sign(body => ethers_signer.signMessage(body));

    expect(token).toBeTruthy();
  });


  it('generate token with custom body data', async () => {
    token = await sign(body => ethers_signer.signMessage(body), '1d', {
      'Custom-field': custom_field_value
    });

    expect(token).toBeTruthy();
  });


  it('throw error that body must contain only strings', async () => {

    expect(
      sign(body => ethers_signer.signMessage(body), '1d', {
        'Custom-field': { kek: 'qwe' }
      })
    ).rejects.toThrowError()
  });


  it('throw error signer must be a function', async () => {

    expect(sign('qwe')).rejects.toThrowError();
  });
})