var router = require('express').Router();
var model = require('../models/user.model');

//findOne
router.get('/:id', function(req, res) {
    model.findOne( { _id: req.params.id } )
        .exec( function(err, user) {
            if (err)
            {
                console.error(err);
                res.status(400).send(err);
            }

            res.JSON(user);
        });
});

router.post('/find', function(req, res) {
    model.find( req.body.query )
        .exec( function(err, users) {
            if (err)
            {
                console.error(err);
                res.status(400).send(err);
            }

            res.JSON(users);
        });
});

router.post('/new', function(req, res) {
    
});

router.post('/update', function(req, res) {

});

router.delete('/:id', function(req, res) {

});

module.exports = router;