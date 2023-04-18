<template>
  <div class="frame">
    <div class="container">
      <header>
        
        <AppLogo class="logo"/>
        <AppLogoShort class="logo-short"/>

        <div class="links">
          <a target="_blank" href="https://github.com/bytesbay/web3-token">
            Github
          </a>

          <a target="_blank" href="https://medium.com/p/a9799da9ab4e">
            Why?
          </a>
        </div>

        <div class="spacer"></div>

        <a target="_blank"  class="docs-btn" href="https://github.com/bytesbay/web3-token#api">
          <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M0 5C0 2.51472 2.01472 0.5 4.5 0.5H14.5C15.3284 0.5 16 1.17157 16 2V17C16 17.5523 15.5523 18 15 18H3.5C1.73676 18 0.278059 16.6961 0.0354444 15H0V5ZM14.5 12.5H3.5C2.39543 12.5 1.5 13.3954 1.5 14.5C1.5 15.6046 2.39543 16.5 3.5 16.5H14.5V12.5ZM4.25 5C4.25 4.58579 4.58579 4.25 5 4.25H12C12.4142 4.25 12.75 4.58579 12.75 5C12.75 5.41421 12.4142 5.75 12 5.75H5C4.58579 5.75 4.25 5.41421 4.25 5ZM5 7.25C4.58579 7.25 4.25 7.58579 4.25 8C4.25 8.41421 4.58579 8.75 5 8.75H10C10.4142 8.75 10.75 8.41421 10.75 8C10.75 7.58579 10.4142 7.25 10 7.25H5Z" fill="#B7BCEA"/>
          </svg>
          Docs
        </a>

      </header>

      <div class="content">

        <div class="main-container">
          <InfoBlock ft class="seo">

            <template #title>
              PARAMETERS
            </template>

            <template #content>
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

              <div style="padding: 20px; padding-top: 40px;">
                <button @click="generateToken" class="gen-btn">
                  Generate
                  <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.46967 1.53033C8.17678 1.23744 8.17678 0.762563 8.46967 0.46967C8.76256 0.176777 9.23744 0.176777 9.53033 0.46967L13.5303 4.46967C13.8232 4.76256 13.8232 5.23744 13.5303 5.53033L9.53033 9.53033C9.23744 9.82322 8.76256 9.82322 8.46967 9.53033C8.17678 9.23744 8.17678 8.76256 8.46967 8.46967L11.1893 5.75H1.5C1.08579 5.75 0.75 5.41421 0.75 5C0.75 4.58579 1.08579 4.25 1.5 4.25H11.1893L8.46967 1.53033Z" fill="black"/>
                  </svg>
                </button>
              </div>

            </template>
          </InfoBlock>

          <InfoBlock ft class="seo">

            <template #title>
              PROGRAM RESULT
            </template>

            <template #content>
              <div>
                <span class="text-warning">>>></span> <b>Your token:</b>
              </div>

              <div>&nbsp;</div>

              <div class="term">
                {{ signed_message }}
              </div>
              
            </template>
          </InfoBlock>
        </div>
        
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
import AppLogoShort from './AppLogoShort.vue';
import InfoBlock from './InfoBlock.vue';
import BgSvg from './BgSvg.vue';
import { sign } from './lib';
import * as Ethers from 'ethers';
import { EthereumProvider } from "@walletconnect/ethereum-provider";
import { SignOpts } from './lib/interfaces';

const form = reactive({
  domain: 'uniswap.org',
  expires_in: '1d',
  expiration_time: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
  not_before: '',
  statement: '',
  nonce: '12345',
  request_id: '',
});

const address = ref<null | string>(null);
let saved_signer: null | Ethers.Signer;
const signed_message = ref<null | string>(null);

// using ethers
async function connectWallet(type: "wallet-connect" | "metamask") {

  if (type === "wallet-connect") {
    const _provider = await EthereumProvider.init({
      showQrModal: true,
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

  const new_form: SignOpts = {  }

  new_form.expiration_time = new Date(form.expiration_time);
  new_form.nonce = form.nonce ? parseInt(form.nonce) : undefined;
  new_form.request_id = form.request_id;
  new_form.statement = form.statement;
  new_form.domain = form.domain;
  new_form.not_before = form.not_before ? new Date(form.not_before) : undefined;
  new_form.expires_in = form.expires_in;
  
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
  position: relative;
  overflow-x: hidden;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;

  .container {
    // padding: 0 20px;
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

        @media (max-width: 500px) {
          width: 200%;
        }
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

      .logo {
        height: 100%;
        width: auto;
      }

      .logo-short {
        height: 100%;
        width: auto;
        display: none;
      }

      @media (max-width: 500px) {
        .logo {
          display: none;
        }

        .logo-short {
          display: block;
        }
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

.main-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1em;

  @media (max-width: 500px) {
    display: block;

    > :last-child {
      margin-top: 3em;
    }
  }
}

</style>
