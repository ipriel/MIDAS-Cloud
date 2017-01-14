var userRoutes = require('./user.route');
var infoRoutes = require('./info.route');

module.exports = function(app) {
    app.use('/api/user', userRoutes);
    app.use('/api/info', infoRoutes);

    // Catch all other routes and return the index file
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, '/www/index.html'));
    });
};