var model = require('../models/user.model');

module.exports = {
    authenticate: function (req, res, next) {
        model.findOne({'mirrors': {$elemMatch: {sn: req.body.sn}}, 'devices': {$elemMatch: {mac: req.body.mac}}})
        .populate({ path: 'mirrors', populate: { path: 'services' } })
        .exec(function(err, user) {
            if (err)
            {
                console.error(err);
                res.status(401).send(err);
            }

            req.body.user = user;
            req.body.mirror = user.mirrors.filter(function (mirror) {
                return mirror.sn === req.body.sn;
            });
            next();
        });
    }
};