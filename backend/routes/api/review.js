const express = require('express');
const asyncHandler = require('express-async-handler');
const { requireAuth } = require('../../utils/auth');
const { serverError } = require('../../utils/serverError');
const { Review } = require('../../db/models');

const router = express.Router();

router.get('/', asyncHandler(async (reg, res) => {
    res.json("Reviews");
  }));

  router.post('/',
    requireAuth,
    asyncHandler(async (req, res, next) => {
      const{startReview, spotId, userId} = req.body;
      const review = await Review.create({
        userId: Number(userId),
        spotId: Number(spotId),
        head: startReview.head,
        body: startReview.body,
        threeRating: Number(startReview.threeRating),
        publicVote: Number(startReview.publicVote)
      });
      const spots = await spots.findAll({
        include: [Review]
      });

      return res.json({ review });

}));

  module.exports = router;
