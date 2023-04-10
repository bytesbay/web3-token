import Base64 from 'base-64'
import {
  hashPersonalMessage,
  toBuffer,
  fromRpcSig,
  ecrecover,
  publicToAddress,
  bufferToHex
} from 'ethereumjs-util';
import toHex from 'to-hex';
import { DecrypterResult } from '../interfaces';

const getVersion = (body: string): number => {
  // @ts-ignore
  const [ str ] = body.match(/Web3[\s-]+Token[\s-]+Version: \d/);

  return Number(str.replace(' ', '').split(':')[1]);
}

export const decrypt = (token: string): DecrypterResult => {
  if(!token || !token.length) {
    throw new Error('Token required.')
  }

  const base64_decoded = Base64.decode(token);

  if(!base64_decoded || !base64_decoded.length) {
    throw new Error('Token malformed (must be base64 encoded)')
  }

  let body: string, signature: string;

  try {
    ({ body, signature } = JSON.parse(base64_decoded));
  } catch (error) {
    throw new Error('Token malformed (unparsable JSON)')
  }

  if(!body || !body.length) {
    throw new Error('Token malformed (empty message)')
  }

  if(!signature || !signature.length) {
    throw new Error('Token malformed (empty signature)')
  }

  const msgBuffer = toBuffer('0x' + toHex(body));
  const msgHash = hashPersonalMessage(msgBuffer);
  const signatureBuffer = toBuffer(signature);  
  const signatureParams = fromRpcSig(signatureBuffer as any);
  
  const publicKey = ecrecover(
    msgHash,
    signatureParams.v,
    signatureParams.r,
    signatureParams.s
  );
  const addressBuffer = publicToAddress(publicKey);
  const address = bufferToHex(addressBuffer).toLowerCase();

  const version = getVersion(body);

  return {
    version, 
    address,
    body, 
    signature
  }
}