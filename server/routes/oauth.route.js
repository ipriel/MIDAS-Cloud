var router = require('express').Router();
var google = require('../services/google');

router.get('/google/:userId/url', google.getAuthUrl);

router.get('/google/:userId/callback', google.resolveToken);

module.exports = router;