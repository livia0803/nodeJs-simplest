const logger = require('./logger');

module.exports = (err, req, res, next) => {
    console.log(err.stack);
    // logger.error(err.stack);
    if (err.isJoi) {
        return res.status(400).send({ error: err.details[0].message });
    }
    return res.status(500).send({ error: 'Something went wrong' });
}