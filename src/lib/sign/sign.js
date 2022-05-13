import Base64 from 'base-64';
import { timeSpan } from '../timespan';
import isValidDomain from 'is-valid-domain';

function isURL(str) {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
}

/**
 * 
 * @param {function} signer - The signer function, must return Promise<string>
 * @param {string|any} params - Params list or just a string representing a lifetime of token (for quick shortcut)
 */
export const sign = async (signer, params = '1d') => {

  if(typeof params === 'string') {
    params = {
      expires_in: params
    }
  }

  validateParams(params);

  processParams(params);

  const msg = buildMessage(params);
  
  const signature = await signer(msg);

  if(typeof signature !== 'string') {
    throw new Error('"signer" argument should be a function that returns a signature string (Promise<string>)')
  }

  const token = Base64.encode(JSON.stringify({
    signature,
    body: msg,
  }))

  return token;
}

const isValidString = val => {
  return typeof val === 'string' && !!val.length;
}

const validateParams = params => {

  for (const key in params) {
    if(typeof params[key] === 'string' && /\n/.test(params[key])) {
      throw new Error(`"${key}" option cannot have LF (\\n)`);
    }
  }

  if(params.domain && (!isValidString(params.domain) || !isValidDomain(params.domain))) {
    throw new Error('Invalid domain format (must be example.com)');
  }

  if(params.uri !== undefined && (!isValidString(params.uri) || !isURL(params.uri))) {
    throw new Error('Invalid uri format (must be https://example.com/login)');
  }

  if(params.chain_id !== undefined && (typeof params.chain_id !== 'number' || isNaN(params.chain_id))) {
    throw new Error('chain_id must be an int');
  }

  if(params.expiration_time && !(params.expiration_time instanceof Date)) {
    throw new Error('expiration_time must be an instance of Date');
  }

  if(params.not_before && !(params.expiration_time instanceof Date)) {
    throw new Error('expiration_time must be an instance of Date');
  }
};

const processParams = params => {

  params.web3_token_version = '2'
  params.issued_at = (new Date()).toISOString();

  if(params.expiration_time) {
    params.expiration_time = params.expiration_time.toISOString();
  }

  if(params.expires_in && !params.expiration_time) {
    params.expiration_time = (new Date(timeSpan(params.expires_in))).toISOString();
  }

  if(!params.expires_in && !params.expiration_time) {
    params.expiration_time = (new Date(timeSpan('1d'))).toISOString();
  }

  if(params.not_before) {
    params.not_before = params.not_before.toISOString();
  }

  if(params.chain_id) {
    params.chain_id = parseInt(Number(params.chain_id));
  }

  if(!params.uri && typeof window !== 'undefined' && window?.location?.href) {
    params.uri = window.location.href;
  }

  if(!params.nonce) {
    params.nonce = parseInt(Math.random() * 99999999);
  }
};

const buildMessage = params => {
  const message = [];

  if(params.domain) {
    message.push(`${params.domain} wants you to sign in with your Ethereum account.`);
    message.push('');
  }

  if(params.statement) {
    message.push(params.statement);
    message.push('');
  }

  const param_labels = {
    'URI': params.uri,
    'Web3 Token Version': params.web3_token_version,
    'Chain ID': params.chain_id,
    'Nonce': params.nonce,
    'Issued At': params.issued_at,
    'Expiration Time': params.expiration_time,
    'Not Before': params.not_before,
    'Request ID': params.request_id,
  };

  for (const label in param_labels) {

    if(param_labels[label] !== undefined) {
      message.push(`${label}: ${param_labels[label]}`)
    }
  }

  return message.join('\n');
};
