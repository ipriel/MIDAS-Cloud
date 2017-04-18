var fs = require('fs');
var googleAuth = require('google-auth-library');
var google = require('googleapis');
var gcal = google.calendar('v3');
var handleError = require('../lib/utils');

var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/';

var clientSecret = "54Zxl3q4Ve7_iKprSreLLsM2";
var clientId = "237519700192-mrk75rnsbc66cttcshfaggf1fj8q9vo7.apps.googleusercontent.com";
var urlBase = "https://midas-server.herokuapp.com/";
var redirectPath = "/oauth2callback";

function storeToken(token, userId) {
    var path = TOKEN_DIR + userId + ".g.json";
    try {
        fs.mkdirSync(TOKEN_DIR);
    } catch (err) {
        if (err.code != 'EEXIST') throw err;
    }

    fs.writeFile(path, JSON.stringify(token));
    console.log('Token stored to ' + path);
};

Array.prototype.pushAll = function(arr) {
    this.push.apply(this, arr);
};

module.exports = {
    getToken: function (req, res, next) {
        var auth = new googleAuth();
        var redirect = urlBase + req.params.userId + redirectPath;
        var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirect);
        var userId = req.params.userId || req.body.userId || (req.body.user || {})._id;

        fs.readFile(TOKEN_DIR + userId + ".g.json", function (err, tokens) {
            if (err) {
                handleError(err, 401);
            } else {
                oauth2Client.setCredentials(tokens);
                req.body.oauth2Client = oauth2Client;
                next();
            }
        });
    },

    getAuthUrl: function (req, res) {
        var auth = new googleAuth();
        var redirect = urlBase + req.params.userId + redirectPath;
        var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirect);

        var url = oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: ['https://www.googleapis.com/auth/calendar.readonly']
        });

        res.json({ url: url });
    },

    resolveToken: function (req, res) {
        var auth = new googleAuth();

        var redirect = urlBase + req.params.userId + redirectPath;
        var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirect);

        oauth2Client.getToken(req.params.code, function (err, tokens) {
            if (err) {
                handleError(err, 500);
            } else {
                oauth2Client.setCredentials(tokens);
                storeToken(tokens, req.params.userId);
                res.status(200).send("OK");
            }
        });
    },

    getCalendars: function (req, res, next) {
        gcal.calendarList.list({ auth: req.body.oauth2Client }, function (err, response) {
            if (err) handleError(err);

            req.body.calendarList = response.items;
            next();
        });
    },

    getEvents: function (req, res, next) {
        var midnight = new Date();
        midnight.setHours(23, 59, 59);

        req.body.calendars.forEach(function (calendar) {
            calendar.events.list({
                auth: req.body.oauth2Client,
                calendarId: calendar,
                timeMin: new Date().toISOString(),
                timeMax: midnight.toISOString(),
                singleEvents: true,
                orderBy: 'startTime'
            }, function (err, respone) {
                if (err) handleError(err);

                req.body.events.pushAll(response.items);
            });
        });

        req.body.events.sort(function (a, b) {
            if (a.originalStartTime.dateTime < b.originalStartTime.dateTime) {
              return -1;
            }
            if (a.originalStartTime.dateTime > b.originalStartTime.dateTime) {
              return 1;
            }
            // a.originalStartTime.dateTime = b.originalStartTime.dateTime
            return 0;
        });
        next();
    }
};