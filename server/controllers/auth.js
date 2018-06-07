const Auth = require('../models/auth');

module.exports = {
  validation: async (req, res, next) => {

    console.log('api/auth/validation');

    const { userid, name, address, birth, country, ethereumAddress, aml, terms, passport, certificateResidence, picture } = req.value.body;

    console.log('userid -> ' + userid);
    console.log('passport -> ' + passport);

    //ファイルbyte上限チェック
    //二重登録チェック

    // creae a new auth
    const newAuth = new Auth({
      _id: userid,
      name: name,
      address: address,
      birth: birth,
      country: country,
      passport: passport,
      certificateResidence: certificateResidence,
      picture: picture,
      ethereumAddress: ethereumAddress,
      aml: aml,
      terms: terms
    });

    await newAuth.save();

    res
      .status(200)
      .json({ message: 'validation Success' });
  },
  insert: async (req, res, next) => {

    console.log('api/auth/insert');

    res
      .status(200)
      .json({ message: 'validation Success' });
  }
};
