var router = require('express').Router();


router.post('/services', function(req, res) {
    res.JSON([{name: "rss", description: "RSS feed"},
              {name: "gmail", description: "Gmail"},
              {name: "gcal", description: "Google calendar"}]);
});

module.exports = router;