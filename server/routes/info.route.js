var router = require('express').Router();


router.get('/service/types', function(req, res) {
    res.JSON([{name: "rss", description: "RSS feed"},
              {name: "gmail", description: "Gmail"},
              {name: "gcal", description: "Google calendar"}]);
});

router.get('/service/:type/template', function(req, res) {
    res.JSON([
        {type: "rss", settings: [{name: "Feed URL", val: "", type: "text"}]}
    ]);
});

module.exports = router;