const express = require('express');
const app = express();
let logger = require('perfect-logger');

const logDir = process.env.APP_LOGS || 'logs/';
const port = process.env.LIVENESS_PROBE_PORT || 3000;

logger.initialize('EC2LivenessProbe', {
    logDirectory: logDir,
    timezone: 'Asia/Colombo'
});

logger.info('Initializing Liveness Probe');

app.get('/', (req, res) => {
    logger.debug(`Serving request from ${req.headers['x-forwarded-for'] || req.connection.remoteAddress}`);
    res.send({})
});

app.listen(port, () => logger.info(`API Server running on port #${port}`));