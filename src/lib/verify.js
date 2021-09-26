import Base64 from 'base-64';
import * as EthUtil from 'ethereumjs-util';
import parseAsHeaders from 'parse-headers';
import toHex from 'to-hex';

export const verify = token => {
  const { body, signature } = JSON.parse(Base64.decode(token));

  const msgBuffer = EthUtil.toBuffer('0x' + toHex(body));
  const msgHash = EthUtil.hashPersonalMessage(msgBuffer);
  const signatureBuffer = EthUtil.toBuffer(signature);
  const signatureParams = EthUtil.fromRpcSig(signatureBuffer);
  const publicKey = EthUtil.ecrecover(
    msgHash,
    signatureParams.v,
    signatureParams.r,
    signatureParams.s
  );
  const addressBuffer = EthUtil.publicToAddress(publicKey);
  const address = EthUtil.bufferToHex(addressBuffer).toUpperCase();

  const parsed_body = parseAsHeaders(body);

  if(parsed_body['expire-date'] && new Date(parsed_body['expire-date']) < new Date()) {
    throw new Error('Token expired')
  }

  return { address, body: parsed_body }
}