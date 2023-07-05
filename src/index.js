const express = require('express');

const bodyParser = require('body-parser');
const compression = require('compression');

const app = express();
const userRouters = require('./routers/users');
const errorHandler = require('./middleWares/errorHandler');
const logger = require('./lib/logger');
const utils = require('./lib/utils');
const conf = require('./lib/conf');


const ctx = utils.getContextRoot();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';


app.use(compression());
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json({ limit: '50mb' })); // parse application/json

app.use(logger.connect('http'));

app.use(`${ctx}`, userRouters);


app.use(errorHandler);

const port = parseInt(process.env.PORT) || conf.get('port');
app.set('port', port);
app.set('port', port);
app.listen(port, () => {
    logger.getLogger().info(`env:${app.get('env')}, listening port: ${port}`);
});