const express = require('express');
const router = require('express-promise-router')();

// @reute GET api/posts/test
// @desc Tests post route
// @access Public
router.get('/test', (req, res) => res.json({ msg: 'Post Works' }));

module.exports = router;
