const Profile = require('../models/profile');

module.exports = {
  // secret
  secret: async (req, res, next) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          errors.noprofile = 'There is no profile for this user';
          return res.status(404).json(errors.noprofile);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  },

  // Create Profile
  createProfile: async (req, res, next) => {
    // Basic Info
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;

    // KYC Information
    profileFields.Profile = {};
    if (req.body.firstName)
      profileFields.Profile.firstName = req.body.firstName;
    if (req.body.lastName) profileFields.Profile.lastName = req.body.lastName;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        // Update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        // Save Profile
        new Profile(profileFields).save().then(profile => res.json(profile));
      }
    });
  },

  // Get Profile
  getProfileByUserId: async (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          errors.noprofile = 'There is no profile for this user';
          res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
};
