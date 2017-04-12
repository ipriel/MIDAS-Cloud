module.exports = function handleError(err, code) {
    code = code || 400;
    console.error(err);
    res.status(code).send(err);
};