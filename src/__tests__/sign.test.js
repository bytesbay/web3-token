import { sign } from '@/lib';
import { ethers as Ethers } from 'ethers';

const mnemonic_instance = Ethers.Wallet.fromMnemonic(process.env['ACCOUNT_MNEMONIC']);
const ethers_provider = new Ethers.providers.JsonRpcProvider(process.env['CHAIN_PROVIDER_URL']);
const ethers_signer = new Ethers.Wallet(
  mnemonic_instance.privateKey, 
  ethers_provider
);

describe('Sign method', () => {

  let token = '';

  it('generate token', async () => {
    token = await sign(body => ethers_signer.signMessage(body), {
      domain: 'worldofdefish.com',
    });

    expect(token).toBeTruthy();
  });


  it('generate token with defined expires_in (in params list)', async () => {
    token = await sign(body => ethers_signer.signMessage(body), {
      expires_in: '1d',
    });

    expect(token).toBeTruthy();
  });


  it('throw error because of invalid expires_in', async () => {

    await expect(
      sign(body => ethers_signer.signMessage(body), {
        domain: 'worldofdefish.com',
        expires_in: 'asd',
      })
    ).rejects.toThrowError()
  });


  it('throw error because of invalid chain_id', async () => {

    await expect(
      sign(body => ethers_signer.signMessage(body), {
        domain: 'worldofdefish.com',
        chain_id: 'ssssa23dsa',
      })
    ).rejects.toThrowError()
  });


  it('throw error because of invalid uri', async () => {

    await expect(
      sign(body => ethers_signer.signMessage(body), {
        domain: 'worldofdefish.com',
        uri: 'local.com',
      })
    ).rejects.toThrowError()
  });


  it('generate token with defined expiration_time and should overwrite expires_in param', async () => {

    token = await sign(body => ethers_signer.signMessage(body), {
      domain: 'worldofdefish.com',
      expiration_time: new Date(),
      expires_in: '1d',
    })

    expect(token).toBeTruthy();
  });


  it('generate token with defined statement and domain', async () => {

    token = await sign(body => ethers_signer.signMessage(body), {
      domain: 'worldofdefish.com',
      statement: 'Test',
      expiration_time: new Date(),
      expires_in: '1d',
      not_before: new Date(),
    })

    expect(token).toBeTruthy();
  });


  it('generate token with defined statement without domain', async () => {

    token = await sign(body => ethers_signer.signMessage(body), {
      expiration_time: new Date(),
      expires_in: '1d',
      statement: 'Test',
      not_before: new Date(),
    })

    expect(token).toBeTruthy();
  });


  it('throw error signer must be a function', async () => {

    await expect(sign('qwe')).rejects.toThrowError();
  });
})