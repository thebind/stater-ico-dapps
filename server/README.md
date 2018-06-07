# Ico Back end

Overview

## Description

## Requirement

- Mailgun Account
  https://www.mailgun.com/
- Google oAuth Account
  https://console.developers.google.com
- Facebook oAuth Account
  https://developers.facebook.com

## Usage

Please make two file bellow on the folder.

/server/config/mailer.js

```js
// URL: https://www.mailgun.com/
module.exports = {
  MAILGUN_USER: 'secret.mailgun.org',
  MAILGUN_PASS: 'secret-secret'
};
```

/server/config/keys.js

```js
module.exports = {
  JWT_SECRET: 'secret',
  oauth: {
    google: {
      clientID: 'secret-secret.apps.googleusercontent.com',
      clientSecret: 'secret'
    },
    facebook: {
      clientID: 'secret',
      clientSecret: 'secret'
    }
  },
  mongoURI: 'mongodb://localhost/binddb'
};
```

## Install

```
$ npm install
```

## Licence

[MIT](https://github.com/tcnksm/tool/blob/master/LICENCE)
