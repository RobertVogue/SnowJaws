const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const spotsRouter = require('./spot.js');
const bookingsRouter = require('./booking.js');
const reviewsRouter = require('./review.js');


router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/spots', spotsRouter);
router.use('/bookings', bookingsRouter);
router.use('/reviews', reviewsRouter);

module.exports = router;
