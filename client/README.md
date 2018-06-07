# Ico Front end

Overview

## Description

## Requirement

- Metamask Chrome Extension
  https://metamask.io/

- Infura Account
  https://infura.io/

## Usage

Provide secretkey from infrfa to the /src/ethereum/web3.js file.

```js
import Web3 from 'web3';

let web3;

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  // We are in browser and Metamask is running
  web3 = new Web3(window.web3.currentProvider);
} else {
  // We are on the server *OR* the user is not running metamask
  const provider = new Web3.providers.HttpProvider(
    'https://rinkeby.infura.io/secretkey'
  );

  web3 = new Web3(provider);
}

export default web3;
```

## Install

```
$ npm install
```

## Licence

[MIT](https://github.com/tcnksm/tool/blob/master/LICENCE)
