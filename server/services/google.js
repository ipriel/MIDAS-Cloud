var fs = require('fs');
var googleAuth = require('google-auth-library');
var google = require('googleapis');
var gcal = google.calendar('v3');

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
        if (err.code != 'EEXIST') {
            throw err;
        }
    }

    fs.writeFile(path, JSON.stringify(token));
    console.log('Token stored to ' + path);
};

module.exports = {
    getToken: function (req, res, next) {
        var auth = new googleAuth();
        var redirect = urlBase + req.params.userId + redirectPath;
        var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirect);
        var userId = req.params.userId || req.body.userId || (req.body.user || {})._id;

        fs.readFile(TOKEN_DIR + userId + ".g.json", function (err, tokens) {
            if (err) {
                res.status(401).send(err);
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
                res.status(500).send(err);
            } else {
                oauth2Client.setCredentials(tokens);
                storeToken(tokens, req.params.userId);
                res.status(200).send("OK");
            }
        });
    },

    getCalendars: function (req, res, next) {
        gcal.calendarList.list({ auth: req.body.oauth2Client }, function (err, response) {
            if (err) {
                console.error(err);
                res.status(400).send(err);
            }

            req.body.calendarList = response.items;
            next();
        });
    },

    getEvents: function (req, res, next) {
        var midnight = new Date();
        midnight.setHours(23, 59, 59);

        req.body.calendars.forEach(function (calendar) {
            calendar.events.list({
                auth: auth,
                calendarId: calendar.id,
                timeMin: new Date().toISOString(),
                timeMax: midnight.toISOString(),
                singleEvents: true,
                orderBy: 'startTime'
            }, function (err, respone) {
                if (err) {
                    console.error(err);
                    res.status(400).send(err);
                }

                req.body.events = response.items;
                next();
            });
        });
    }
};