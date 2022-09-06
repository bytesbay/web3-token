export type Signer = (msg: string) => Promise<string>;

export interface SignOpts {

  expires_in?: string | number;

  not_before?: Date;

  expiration_time?: Date;

  statement?: string;

  nonce?: number;

  request_id?: string;

  domain?: string;
  
  uri?: string;

  chain_id?: number;
}

export interface SignBody {

  expiration_time: Date;

  web3_token_version: string;

  issued_at: Date;

  not_before?: Date;

  statement?: string;

  nonce?: number;

  request_id?: string;

  domain?: string;
  
  uri?: string;

  chain_id?: number;
}


export interface DecryptedToken {

  address: string;

  body: any;
}

export interface DecrypterResult {

  version: number;

  address: string;

  body: string;

  signature: string;
}


export interface VerifyOpts {

  domain?: string;
}



export interface DecryptedBody {
  'uri'?: string;
  'web3-token-version': number;
  'chain-id'?: number;
  'nonce'?: number;
  'issued-at': string;
  'expiration-time': string;
  'not-before'?: string;
  'request-id'?: string;
  'statement'?: string;
  'domain'?: string;
}


export type MessageSections = (string[])[];