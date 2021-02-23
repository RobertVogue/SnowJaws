const express = require('express');
const asyncHandler = require('express-async-handler');
const { requireAuth } = require('../../utils/auth');
const { serverError } = require('../../utils/serverError');
const { Spot, Review, Admin, User} = require('../../db/models');

const router = express.Router();

router.get('/',
  asyncHandler(async (req, res) => {
    const spots = await Spot.findAll({
      include: [{ model: User, through: Admin }],
      order: [['id', 'ASC']]
    });
    res.json({ spots });
  })
);
router.get('/reviews',
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const spots = await Spot.findAll({
      include: [
        { model: Review, include: { model: User } },
        { model: User, through: Admin }
      ],
      order: [['id', 'ASC']]
    });
    res.json({ spots });
  })
);

router.get('/:id',
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const spot = await Spot.findByPk(id);
    res.json({ spot });
  })
);
router.get('/:id/reviews',
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const spot = await Spot.findByPk(id, {
      include: [
        { model: Review, include: { model: User } },
        { model: User, through: Admin }
      ],
    });
    res.json({ spot });
  })
);

router.post('/',
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const spotDataObj = req.body.spot;
    if (req.user.id !== spotDataObj.userId) {
      return next(serverError(401, 'Admin creating failed', ["Unauthorized user"]));
    }
    delete spotDataObj.userId;
    try {
      let spot = await Spot.create(spotDataObj);
      let err;
      let admin;
      try {
        admin = await Admin.build({ userId: req.user.id, spotId: spot.id });
        await admin.save();
      } catch (e) {
        return next(serverError(401, 'Admin creating failed', ["Could not create admin"]));
      }
      spot = await Spot.findByPk(spot.id, {
        include: [
          { model: Review, include: { model: User } },
          { model: User, through: Admin }
        ],
      })
      let returnJson = { spot };
      if (admin) returnJson.admin = admin;
      if (err) returnJson.error = err;
      res.json(returnJson);
    } catch (error) {
      return next(serverError(401, 'Admin creating failed', ["Could not create admin", error]));
    }
  })
);

module.exports = router;
