import Base64 from 'base-64';
import * as EthUtil from 'ethereumjs-util';
import parseAsHeaders from 'parse-headers';
import toHex from 'to-hex';

export const verify = token => {

  if(!token || !token.length) {
    throw new Error('Token required.')
  }

  try {
    var base64_decoded = Base64.decode(token);
  } catch (error) {
    throw new Error('Token malformed (must be base64 encoded)')
  }

  if(!base64_decoded || !base64_decoded.length) {
    throw new Error('Token malformed (must be base64 encoded)')
  }

  try {
    var { body, signature } = JSON.parse(base64_decoded);
  } catch (error) {
    throw new Error('Token malformed (unparsable JSON)')
  }

  if(!body || !body.length) {
    throw new Error('Token malformed (empty message)')
  }

  if(!signature || !signature.length) {
    throw new Error('Token malformed (empty signature)')
  }

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

  return { address: address.toUpperCase(), body: parsed_body }
}