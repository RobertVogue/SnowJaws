const router = require('express').Router();
const sessionRouter = require('./session.js');
const spotsRouter = require('./spot.js');
const reviewsRouter = require('./review.js');


router.use('/session', sessionRouter);
router.use('/spots', spotsRouter);
router.use('/reviews', reviewsRouter);

module.exports = router;
