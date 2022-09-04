import Base64 from 'base-64';
import { timeSpan } from '../timespan';
import isValidDomain from 'is-valid-domain';
import { SignBody, Signer, SignOpts } from '../interfaces';

function isURL(str: string): boolean {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
}

export const sign = async (
  signer: Signer, 
  opts: string | SignOpts = '1d'
): Promise<string> => {

  const params = typeof opts === 'string' ? {
    expires_in: opts
  } : opts;

  validateParams(params);

  const body = processParams(params);

  const msg = buildMessage(body);
  
  const signature = await signer(msg);

  if(typeof signature !== 'string') {
    throw new Error('"signer" argument should be a function that returns a signature string (Promise<string>)')
  }

  const token = Base64.encode(JSON.stringify({
    signature,
    body: msg,
  }));

  return token;
}

const isValidString = (val: string): boolean => {
  return typeof val === 'string' && !!val.length;
}

const validateParams = (params: SignOpts) => {

  for (const key in params) {
    if(typeof (params as any)[key] === 'string' && /\n/.test((params as any)[key])) {
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

  if(params.not_before && !(params.not_before instanceof Date)) {
    throw new Error('not_before must be an instance of Date');
  }
};

const processParams = (params: SignOpts): SignBody => {

  const body = {} as SignBody;

  body.web3_token_version = '2'
  body.issued_at = new Date();

  if(params.expiration_time) {
    body.expiration_time = new Date(params.expiration_time);
  }

  if(params.expires_in && !params.expiration_time) {
    body.expiration_time = timeSpan(params.expires_in);
  }

  if(!params.expires_in && !params.expiration_time) {
    body.expiration_time = timeSpan('1d');
  }

  if(params.not_before) {
    body.not_before = new Date(params.not_before);
  }

  if(params.chain_id) {
    body.chain_id = parseInt(String(params.chain_id));
  }

  if(!params.uri && typeof window !== 'undefined' && window?.location?.href) {
    body.uri = window.location.href;
  }

  if(!params.nonce) {
    body.nonce = parseInt(String(Math.random() * 99999999));
  }

  if(params.domain) {
    body.domain = params.domain;
  }

  if(params.statement) {
    body.statement = params.statement;
  }

  return body;
};

const buildMessage = (params: SignBody): string => {
  const message: string[] = [];

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
    'Issued At': params.issued_at.toISOString(),
    'Expiration Time': params.expiration_time.toISOString(),
    'Not Before': params.not_before ? params.not_before.toISOString() : undefined,
    'Request ID': params.request_id,
  };

  for (const label in param_labels) {

    if((param_labels as any)[label] !== undefined) {
      
      // @ts-ignore
      message.push(`${label}: ${(param_labels as any)[label]}`)
    }
  }

  return message.join('\n');
};
