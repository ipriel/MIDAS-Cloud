var router = require('express').Router();
var User = require('../models/user.model');
var Service = require('../models/service.model');
var handleError = require('./utils');

router.get('/:id', function (req, res) {
    User.findById(req.params.id)
        .populate({ path: 'mirrors', populate: { path: 'services' } })
        .populate({ path: "services" })
        .exec(function (err, user) {
            if (err) handleError(err);

            res.json(user);
        });
});

router.get('/:id/data', function (req, res) {
    User.findById(req.params.id)
        .populate({ path: 'mirrors', populate: { path: 'services' } })
        .populate({ path: "services" })
        .exec(function (err, user) {
            if (err) handleError(err);

            var data = Object.assign({}, user);
            delete data.auth_id;

            res.json(data);
        });
});

router.post('/device/pair', function (req, res) {
    User.findOneAndUpdate({_id: req.body.userId, "devices.mac": req.body.child}, { $set: { 'devices.$.paired': true } }, function (err, user) {
        if (err) handleError(err);

        res.json(req.body.child);
    });
});

router.post('/device/depair', function (req, res) {
    User.findByIdAndUpdate(req.body.userId, { $pull: { devices: { mac: req.body.child } } }, {new: true}, function (err, user) {
        if (err) handleError(err, 500);

        res.json(req.body.child);
    });
});

router.post('/mirror/add', function (req, res) {
    User.findByIdAndUpdate(req.body.userId, { $push: { mirrors: req.body.child } }, {new: true}, function (err, user) {
        if (err) handleError(err);

        res.json(req.body.child);
    });
});

router.post('/mirror/edit', function (req, res) {
    User.findOneAndUpdate({_id: req.body.userId, "mirrors.sn": req.body.child.sn}, { $set: { 'mirrors.$': req.body.child } }, function (err, user) {
        if (err) handleError(err);

        res.json(req.body.child);
    });
});

router.post('/mirror/delete', function (req, res) {
    User.findByIdAndUpdate(req.body.userId, { $pull: { mirrors: { sn: req.body.child } } }, {new: true}, function (err, user) {
        if (err) handleError(err, 500);

        res.json(req.body.child);
    });
});

router.post('/service/link', function (req, res) {
    User.findOneAndUpdate({_id: req.body.userId, "mirrors.sn": req.body.parentId}, { $push: { 'mirrors.$.services': req.body.child } }, function (err, user) {
        if (err) handleError(err);

        res.json(req.body);
    });
});

router.post('/service/unlink', function (req, res) {
    User.findOneAndUpdate({_id: req.body.userId, "mirrors.sn": req.body.parentId}, { $pull: { 'mirrors.$.services': req.body.child } }, function (err, user) {
        if (err) handleError(err);

        res.json(req.body);
    });
});

router.post('/service/add', function (req, res) {
    Service.create(req.body.child, function (err, service) {
        if (err) handleError(err, 500);

        User.findByIdAndUpdate(req.body.userId, { $addToSet: { services: service } }, {new: true}, function (err, user) {
            if (err) handleError(err, 500);

            res.json(service);
        });
    });
});

router.post('/service/edit', function (req, res) {
    Service.findByIdAndUpdate(req.body.userId, req.body.child, {new: true}, function (err, service) {
        if (err) handleError(err);

        res.json(service);
    });
});

router.post('/service/delete', function (req, res) {
    User.findByIdAndUpdate(req.body.userId, { $pull: { services: { _id: req.body.child } } }, {new: true}, function (err, user) {
        if (err) handleError(err, 500);

        Service.findByIdAndRemove(req.body.child, function (err, service) {
            if (err) handleError(err, 500);

            res.json(service);
        });
    });
});

module.exports = router;