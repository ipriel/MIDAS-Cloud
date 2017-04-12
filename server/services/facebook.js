var Facebook = require('facebook-node-sdk');
var appID = "198985247267929";
var appSecret = "7bf179362cc0b2d7274329656df6ba7c";
var FB = new Facebook({ appID: appID, secret: appSecret });

module.exports = {
    api: function(path, callback) {
        return FB.api(path, callback);
    },

    parseToken: function(token, callback) {
        return FB.api("/debug_token?input_token=" + token + "&access_token=" + appID + "|" + appSecret, callback);
    }
};