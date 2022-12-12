const router = require('express').Router();
const messageRouter = require('./messages');
router.use('/message', messageRouter);

module.exports = router