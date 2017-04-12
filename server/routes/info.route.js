var router = require('express').Router();
var model = require('../models/serviceTemplate.model');
var handleError = require('./utils');

router.get('/types', function (req, res) {
    /*res.json([{ name: "rss", description: "RSS feed" },
              { name: "weather", description: "Weather by OpenWeatherMap" },
            //{name: "google/mail", description: "Gmail"},
              { name: "google/calendar", description: "Google calendar" }]);*/

    model.find({})
        .select('type description -_id')
        .exec(function (err, serviceTypes) {
            if (err) handleError(err);

            res.json(serviceTypes);
        });
});

router.get('/:type/template', function (req, res) {
    /*var templates = [
        { type: "rss", settings: [{ name: "Feed URL", val: "", type: "text" }] }
    ];
    res.json(templates[req.params.type]);*/

    model.findOne({type: req.params.type}, '-description -_id', function (err, serviceTemplates) {
            if (err) handleError(err);

            res.json(serviceTemplates);
        });
});

router.get('/mirror/:sn/profiles', function (req, res) {
    user.find({ 'mirrors.sn': req.params.sn })
        .select('name _id')
        .exec(function (err, users) {
            if (err) handleError(err);

            res.JSON(users);
        });
});

module.exports = router;