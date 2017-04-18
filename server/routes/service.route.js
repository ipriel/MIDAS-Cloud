var router = require('express').Router();
var weather = require('weather.js');
weather.setApiKey('ca2dfe6e258d29f79683fe6a0d2aa183');
var rss = require('rss-to-json');
var google = require('../services/google');
var midas = require('../services/midas');
var Mirror = require('../models/mirror.model');
var User = require('../models/user.model');
var handleError = require('../lib/utils');

/*function filterGCals(req, res, next) {
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
};*/

router.get('/weather', /*midas.authenticate,*/ function (req, res) {
    weather.getCurrent(req.query.location, function (current) {
        let data = current.list[0];
        data.main.temp = weather.kelvinToCelsius(current.temperature());

        res.json(data.main.temp);
    });
});

router.get('/rss', /*midas.authenticate,*/ function (req, res) {
    rss.load(req.query.url, function (err, rss) {
        if (err) handleError(err);

        res.json(rss);
    });
});

router.get('/google/calendar', /*midas.authenticate, google.getToken,*/ function (req, res, next) {
    /*req.body.calendars = service.settings.find(function(setting) {
        return setting.name === "calendars";
    }).val;
    next();*/
    res.json({events: ["8:30 - Meeting with Mark", "13:30 - Lunch meeting with Susan @ Arcaffe", "15:00 - Sprint Meeting with Dev Team", "21:00 - Fiddler on the Roof @ Cameri Theatre"]})
});/*, google.getEvents, function (req, res) {
    res.send(req.body.events);
});*/

/*router.post('/google/calendar', midas.authenticate, google.getToken, google.getCalendars, filterGCals, google.getEvents, function (req, res) {
    res.send(req.body.events);
});*/

module.exports = router;