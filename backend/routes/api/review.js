const express = require('express');
const asyncHandler = require('express-async-handler');
const { requireAuth } = require('../../utils/auth');
const { errorToSend } = require('../../utils/senderror');
const { Review } = require('../../db/models');

const router = express.Router();

router.get('/', asyncHandler(async (reg, res) => {
    res.json("All reviews - to be implemented");
  }));

  router.post('/',
    requireAuth,
    asyncHandler(async (req, res, next) => {
      const reviewDataObj = req.body.review;
      if (req.user.id !== reviewDataObj.userId) {
        return next(errorToSend(401, 'Review creating failed', ["Unauthorized user"]));
      }
      reviewDataObj.type = 0;
      //TODO: implement backend review validation before attempting to create a row in database
      try{
        const review = await Review.create(reviewDataObj);
        res.json({ review });
      } catch (error) {
        return next(errorToSend(401, 'Review creating failed', ["Could not create review"]));
      }
    })
  );

  module.exports = router;
