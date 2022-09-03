export type Signer = (msg: string) => Promise<string>;

export interface SignOpts {

  expires_in?: string;

  not_before?: Date | string;

  expiration_time?: Date | string;

  statement?: string;

  nonce?: number;

  request_id?: string;

  domain?: string;
  
  uri?: string;

  chain_id?: number;
};

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
};


export interface DecryptedToken {

  address: string;

  body: any;
};

export interface DecrypterResult {

  version: number;

  address: string;

  body: string;

  signature: string;
}


export interface VerifyOpts {

  domain?: string;
}


export type MessageSections = (string[])[];