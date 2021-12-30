type Signer = (msg: string) => PromiseLike<string>

export function sign(
    signer: Signer,
    opts?: string | number | Object): PromiseLike<string>

export function verify(
    token: string,
    opts?: Object
): {
    address: string,
    body: Object
}

declare const Web3Token: {
    sign: typeof sign,
    verify: typeof verify
}

export default Web3Token