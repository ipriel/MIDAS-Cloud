var router = require('express').Router();
var weather = require('weather.js');
weather.setApiKey('ca2dfe6e258d29f79683fe6a0d2aa183');
var rss = require('rss-to-json');
var google = require('../services/google');
var midas = require('../services/midas');
var Mirror = require('../models/mirror.model');
var User = require('../models/user.model');
var handleError = require('./utils');

function filterGCals(req, res, next) {
    var service = req.body.mirror.services.filter(function (service) {
        return service.type = "google/calendar";
    });

    if (service) {
        var calendarIds = service.settings.filter(function(setting) {
            return setting.name === "calendars";
        }).val;

        if (calendarIds && calendarIds.length > 0) {
            req.body.calendars = req.body.calendarList.filter(function(calendar) {
                return calendarIds.indexOf(calendar.id) > 0;
            });
        } else {
            req.body.calendars = req.body.calendarList;
        }

        next ();
    } else {
        handleError("Service \"google/calendar\" not configured for " + req.body.mirror.name);
    }
};

router.get('/weather/:location', function (req, res) {
    weather.getCurrent(req.params.location, function (current) {
        let data = current.list[0];
        data.main.temp = weather.kelvinToCelsius(current.temperature());

        res.json(data);
    });
});

router.post('/rss', midas.authenticate, function (req, res) {
    rss.load(req.body.url, function (err, rss) {
        if (err) handleError(err);

        res.json(rss.items);
    });
});

router.get('/google/:userId/calendar/list', google.getToken, google.getCalendars, function (req, res) {
    res.json(req.body.calendarList);
});

router.post('/google/calendar/events', midas.authenticate, google.getToken, google.getCalendars, filterGCals, google.getEvents, function (req, res) {
    res.send(req.body.events);
});

module.exports = router;