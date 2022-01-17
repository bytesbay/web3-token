declare module "web3-token" {
  type Signer = (msg: string) => PromiseLike<string>;

  interface VerifyOpts {
    domain?: string;
  }
  interface SignOpts extends VerifyOpts {
    expires_in?: string;
    not_before?: Date;
    expiration_time?: Date;
    statement?: string;
    nonce?: string;
    request_id?: string;
  }
  interface VerifyBody extends Record<string, string | string[]> {
    domain?: string;
    statement?: string;
  }

  export function sign(
    signer: Signer,
    opts?: string | number | SignOpts
  ): PromiseLike<string>;

  export function verify(
    token: string,
    opts?: VerifyOpts
  ): {
    address: string;
    body: VerifyBody;
  };

  export default interface Web3Token {
    sign: typeof sign;
    verify: typeof verify;
  }
}
