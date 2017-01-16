var path = require('path');
var userRoutes = require('./user.route');
var infoRoutes = require('./info.route');

module.exports = function(app, rootDir) {
    app.use('/api/user', userRoutes);
    app.use('/api/info', infoRoutes);

    // Catch all requests for assets (js, css, etc.)
    app.get('*.*$', function(req, res) {
        res.sendFile(path.join(rootDir, 'www', req.path));
    });

    // Catch all other routes and return the index file
    app.get('*', function(req, res) {
        res.sendFile(path.join(rootDir, 'www', 'index.html'));
    });
};