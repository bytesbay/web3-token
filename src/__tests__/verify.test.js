import { sign, verify } from '@/lib';
import { ethers as Ethers } from 'ethers';

const mnemonic_instance = Ethers.Wallet.fromMnemonic(process.env['ACCOUNT_MNEMONIC']);
const ethers_provider = new Ethers.providers.JsonRpcProvider(process.env['CHAIN_PROVIDER_URL']);
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

describe('Verify method', () => {

  let real_address = ethers_signer.address.toLowerCase();

  it('must verify a signature', async () => {
    const token = await sign(body => ethers_signer.signMessage(body), { ...default_token })

    const { address, body } = await verify(token);

    expect(address).toEqual(real_address);
    expect(body['statement']).toEqual(default_token.statement);
    expect(body['domain']).toEqual(default_token.domain);
  });

  it('must throw an error coz of past expiration_time', async () => {

    const token = await sign(body => ethers_signer.signMessage(body), {
      ...default_token,
      expiration_time: new Date(Date.now() - 1)
    })

    expect(() => verify(token)).toThrowError()
  });

  it('must throw an error coz of future not_before date', async () => {

    const token = await sign(body => ethers_signer.signMessage(body), {
      ...default_token,
      not_before: new Date(Date.now() + (3600 * 1000))
    })

    expect(() => verify(token)).toThrowError()
  });

  it('must throw an error coz of diff domains', async () => {

    const token = await sign(body => ethers_signer.signMessage(body), {
      ...default_token
    })

    expect(() => verify(token, { domain: 'qwe.qwe' })).toThrowError()
  });

  it('must throw error of malformed token', async () => {
    expect(() => verify('qweqwe')).toThrowError()
  });
})