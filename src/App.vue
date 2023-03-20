<template>
  <div class="frame">
    <div class="container">
      <header>
        
        <AppLogo/>

        <div class="links">
          <a href="#">
            Playground
          </a>

          <a href="#">
            Why?
          </a>
        </div>

        <div class="spacer"></div>

        <button class="docs-btn">
          <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M0 5C0 2.51472 2.01472 0.5 4.5 0.5H14.5C15.3284 0.5 16 1.17157 16 2V17C16 17.5523 15.5523 18 15 18H3.5C1.73676 18 0.278059 16.6961 0.0354444 15H0V5ZM14.5 12.5H3.5C2.39543 12.5 1.5 13.3954 1.5 14.5C1.5 15.6046 2.39543 16.5 3.5 16.5H14.5V12.5ZM4.25 5C4.25 4.58579 4.58579 4.25 5 4.25H12C12.4142 4.25 12.75 4.58579 12.75 5C12.75 5.41421 12.4142 5.75 12 5.75H5C4.58579 5.75 4.25 5.41421 4.25 5ZM5 7.25C4.58579 7.25 4.25 7.58579 4.25 8C4.25 8.41421 4.58579 8.75 5 8.75H10C10.4142 8.75 10.75 8.41421 10.75 8C10.75 7.58579 10.4142 7.25 10 7.25H5Z" fill="#B7BCEA"/>
          </svg>
          Docs
        </button>

      </header>

      <div class="content">

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1em;">
          <InfoBlock ft class="seo">

            <template #title>
              MODULE DESCRIPTION
            </template>

            <template #content>
              <div>
                <span class="text-warning">>>></span> <h1 style="display: inline; font-size: 1em;">Web3 Token</h1>
              </div>
              <div>&nbsp;</div>
              <div>------</div>
              <div>&nbsp;</div>
              <div>
                Web3 Token is a new way to authenticate users in a hybrid dApps using signed messages. Implementation of EIP-4361.
              </div>
            </template>
          </InfoBlock>

          <InfoBlock ft class="seo">

            <template #title>
              HYPERLINKS
            </template>

            <template #content>
              <div>
                <span class="text-warning">Github:</span> <a href="https://github.com/bytesbay/web3-token" target="_blank">https://github.com/bytesbay/web3-token</a>
              </div>

              <div>
                <span class="text-warning">NPM:</span> <a href="https://www.npmjs.com/package/web3-token" target="_blank">https://www.npmjs.com/package/web3-token</a>
              </div>
              
            </template>
          </InfoBlock>
        </div>


        <InfoBlock class="" style="margin-top: 2em;">
          <template #title>
            <svg class="pg-icon" width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M9.99989 0.25C10.4141 0.25 10.7499 0.585786 10.7499 1V2.7369C12.1813 2.75655 13.6121 2.83247 15.0391 2.96464L15.3707 2.99536C17.6354 3.20514 19.3793 5.0858 19.4178 7.3599L19.4299 8.07336C19.477 10.8482 19.2533 13.621 18.7621 16.3524C18.5386 17.5955 17.4569 18.5 16.1939 18.5H15.9728C14.8363 18.5 13.8066 17.8302 13.3458 16.7914L12.2852 14.4001C11.4062 12.4182 8.5936 12.4182 7.71459 14.4001L6.65399 16.7914C6.19321 17.8302 5.16348 18.5 4.02699 18.5H3.80594C2.54294 18.5 1.46123 17.5955 1.23769 16.3524C0.746493 13.621 0.522822 10.8482 0.569851 8.07336L0.581942 7.3599C0.620485 5.0858 2.3644 3.20514 4.62913 2.99536L4.96073 2.96464C6.38766 2.83247 7.81848 2.75655 9.24989 2.7369V1C9.24989 0.585786 9.58568 0.25 9.99989 0.25ZM14.9999 6C14.9999 5.44772 14.5522 5 13.9999 5C13.4476 5 12.9999 5.44772 12.9999 6V6.25C12.9999 6.80228 13.4476 7.25 13.9999 7.25C14.5522 7.25 14.9999 6.80228 14.9999 6.25V6ZM5.99989 5.25C6.41411 5.25 6.74989 5.58579 6.74989 6V7.25H7.99989C8.41411 7.25 8.74989 7.58579 8.74989 8C8.74989 8.41421 8.41411 8.75 7.99989 8.75H6.74989V10C6.74989 10.4142 6.41411 10.75 5.99989 10.75C5.58568 10.75 5.24989 10.4142 5.24989 10V8.75H3.99989C3.58568 8.75 3.24989 8.41421 3.24989 8C3.24989 7.58579 3.58568 7.25 3.99989 7.25L5.24989 7.25V6C5.24989 5.58579 5.58568 5.25 5.99989 5.25ZM13.9999 8.75C14.5522 8.75 14.9999 9.19772 14.9999 9.75V10C14.9999 10.5523 14.5522 11 13.9999 11C13.4476 11 12.9999 10.5523 12.9999 10V9.75C12.9999 9.19771 13.4476 8.75 13.9999 8.75ZM15.9999 9C16.5522 9 16.9999 8.55228 16.9999 8C16.9999 7.44772 16.5522 7 15.9999 7H15.7499C15.1976 7 14.7499 7.44771 14.7499 8C14.7499 8.55228 15.1976 9 15.7499 9H15.9999ZM13.2499 8C13.2499 8.55228 12.8022 9 12.2499 9H11.9999C11.4476 9 10.9999 8.55228 10.9999 8C10.9999 7.44771 11.4476 7 11.9999 7H12.2499C12.8022 7 13.2499 7.44772 13.2499 8Z"/>
            </svg>
            PLAYGROUND
          </template>

          <template #content>
            <div class="pg">
              <div style="height: 100%;">
                <div>
                  <span class="text-warning">>>></span> <b>Signing data:</b>
                </div>
                <div style="margin-top: 1em; padding-bottom: 50px;">

                  <template v-if="!address">
                    <div>
                      Connect wallet:
                    </div>
                    <div>
                      1. <span @click="connectWallet('metamask')" class="wallet m">
                        Metamask
                      </span>
                    </div>
                    <div>
                      2. <span @click="connectWallet('wallet-connect')" class="wallet w">
                        Wallet Connect
                      </span>
                    </div>
                  </template>
                  <template v-else>
                    <div>
                      Connected wallet:
                    </div>
                    <div>
                      <span class="text-warning">
                        {{ address }}
                      </span>
                    </div>
                  </template>

                  <div>&nbsp;</div>

                  <div>
                    Edit the data below and click the button to generate a token.
                  </div>
                  <div>&nbsp;</div>
                  <div style="display: flex;">
                    Domain:&nbsp;<input type="text" v-model="form.domain">
                  </div>
                  <div>&nbsp;</div>
                  <div>------</div>
                  <div>&nbsp;</div>
                  <div style="display: flex;">
                    Expires&nbsp;in:&nbsp;<input type="text" v-model="form.expires_in">
                  </div>
                  <div style="display: flex;">
                    Expiration&nbsp;time:&nbsp;<input type="text" v-model="form.expiration_time">
                  </div>
                  <div>&nbsp;</div>
                  <div>
                    <span style="color: #FEA200;">*&nbsp;</span>If you specify both Expires in and Expiration time, the latter will be used.
                  </div>
                  <div>&nbsp;</div>
                  <div>------</div>
                  <div>&nbsp;</div>
                  <div style="display: flex;">
                    Not&nbsp;before:&nbsp;<input type="text" v-model="form.not_before">
                  </div>
                  <div style="display: flex;">
                    Statement:&nbsp;<input type="text" v-model="form.statement">
                  </div>
                  <div style="display: flex;">
                    Nonce:&nbsp;<input type="text" v-model="form.nonce">
                  </div>
                  <div style="display: flex;">
                    Request&nbsp;ID:&nbsp;<input type="text" v-model="form.request_id">
                  </div>
                </div>

                <div style="padding: 20px;">
                  <button @click="generateToken" class="gen-btn">
                    Generate
                    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.46967 1.53033C8.17678 1.23744 8.17678 0.762563 8.46967 0.46967C8.76256 0.176777 9.23744 0.176777 9.53033 0.46967L13.5303 4.46967C13.8232 4.76256 13.8232 5.23744 13.5303 5.53033L9.53033 9.53033C9.23744 9.82322 8.76256 9.82322 8.46967 9.53033C8.17678 9.23744 8.17678 8.76256 8.46967 8.46967L11.1893 5.75H1.5C1.08579 5.75 0.75 5.41421 0.75 5C0.75 4.58579 1.08579 4.25 1.5 4.25H11.1893L8.46967 1.53033Z" fill="black"/>
                    </svg>

                  </button>
                </div>
              </div>
              <div style="display: flex; flex-direction: column;">
                <div>
                  <span class="text-warning">>>></span> <b>Your token:</b>
                </div>
                <div class="term">
                  {{ signed_message }}
                </div>
              </div>
            </div>
          </template>
        </InfoBlock>

        <BgSvg />
      </div>

      <footer>
        Made in 🇺🇦
      </footer>
    </div>

  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import AppLogo from './AppLogo.vue';
// @ts-ignore
import InfoBlock from './InfoBlock.vue';
import BgSvg from './BgSvg.vue';
import { sign } from './lib';
import * as Ethers from 'ethers';
import { EthereumProvider } from "@walletconnect/ethereum-provider";

const form = reactive({
  domain: 'uniswap.org',
  expires_in: '1d',
  expiration_time: '09.03.2023, 21:49:41',
  not_before: '',
  statement: '',
  nonce: '',
  request_id: '',
});

const address = ref<null | string>(null);
let saved_signer: null | Ethers.Signer;
const signed_message = ref<null | string>(null);

// using ethers
async function connectWallet(type: "wallet-connect" | "metamask") {

  if (type === "wallet-connect") {
    const _provider = await EthereumProvider.init({
      projectId: 'd6a07ee60a0f4db6876af0290397ce3e',
      chains: [
        1
      ]
    });
    await _provider.enable();
    // await _provider.connect();
    const provider = new Ethers.BrowserProvider(_provider);
    const signer = await provider.getSigner();

    address.value = signer.address;

    _provider.on('accountsChanged', (accounts: string[]) => {
      address.value = accounts[0];
    });

    _provider.on('disconnect', () => {
      address.value = null;
    });

    saved_signer = signer;
  }
  else if(type === "metamask") {

    // @ts-ignore
    const eth = window.ethereum;

    await eth.enable();
    const provider = new Ethers.BrowserProvider(eth);
    const signer = await provider.getSigner();

    address.value = signer.address;

    eth.on('accountsChanged', (accounts: string[]) => {
      address.value = accounts[0];
    });

    eth.on('disconnect', () => {
      address.value = null;
    });

    saved_signer = signer;
  }
}

async function generateToken() {

  const new_form: any = { ...form }

  new_form.expiration_time = new Date(new_form.expiration_time);

  const signature = await sign(async message => {

    if(!saved_signer) {
      throw new Error('No signer');
    }

    const signed_message = await saved_signer?.signMessage(message);

    return signed_message;

  }, new_form);

  signed_message.value = signature;
}

</script>

<style lang="scss" scoped>

.frame {
  display: flex;
  flex-direction: column;
  width: 100vw;
  position: relative;
  overflow-x: hidden;

  .container {
    padding: 0 20px;
    max-width: 960px;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    position: relative;

    .content {
      flex: 1;
      display: flex;
      flex-direction: column;
      margin-top: 50px;
      padding-bottom: 100px;
      position: relative;

      .form {
        width: 100%;
        max-width: 500px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      > svg {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 130%;
        height: auto;
        z-index: -1;
      }
    }

    header {

      display: flex;
      align-items: center;
      height: 40px;
      padding: 25px 0;

      .links {
        margin-left: 32px;
        a {
          margin-left: 16px;
          display: inline-block;
          color: inherit;
          text-decoration: none;
        }
      }

      svg {
        height: 100%;
        width: auto;
      }
      
    }

    footer {
      color: #999;
      padding: 20px 0;
    }
  }

  .docs-btn {
    background: transparent;
    padding: 8px 16px;
    color: #000;
    background: #FF4852;
    font-size: 14px;
    font-weight: 500;
    border: 0;
    cursor: pointer;
    display: flex;
    align-items: center;

    &:hover {
      background: #FEA200;
    }

    svg {
      margin-left: -4px;
      margin-right: 8px;
      width: 12px !important;
      height: auto;
      path {
        fill: #000;
      }
    }
  }

  .gen-btn {
    background: transparent;
    padding: 8px 16px;
    color: #000;
    background: #B7BCEA;
    font-size: 14px;
    font-weight: 500;
    border: 0;
    cursor: pointer;
    width: 100%;

    &:hover {
      background: #FEA200;
    }

    svg {
      margin-right: -4px;
      margin-left: 8px;
      width: 12px !important;
      height: auto;
      path {
        fill: #000;
      }
    }
  }

  .pg-icon {
    width: 12px;
    height: auto;
    margin-right: 8px;
    margin-left: -4px;
  }

  .term {
    margin-top: 1em;
    background: #FF4852;
    color: #000;
    padding: 1em;
    word-break: break-all;
    flex-grow: 1;
  }

  .pg {
    display: grid;
    grid-template-columns: 1fr 1fr;
    height: 100%;
    gap: 1em;
  }

  input {
    border: 0;
    background: transparent;
    padding: 0 0;
    color: #FEA200;
    font-weight: 500;
    width: 100%;

    &::placeholder {
      color: #B7BCEA;
    }

    &:focus {
      outline: none;
    }

    &::before {
      content: '>>>';
      color: #FF4852;
      margin-right: 8px;
    }
  }

  .wallet {
    display: inline-block;
    cursor: pointer;

    &.m {
      color: #FEA200;

      &:hover {
        background: #FEA200;
      }
    }

    &.w {
      color: #4058bc;

      &:hover {
        background: #4058bc;
      }
    }

    &:hover {
      color: #000;
    }
  }
}

</style>
