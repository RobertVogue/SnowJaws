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
    const spots = await Spot.findByPk(id);
    res.json({ spots });
  })
);
router.get('/:id/reviews',
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const spots = await Spot.findByPk(id, {
      include: [
        { model: Review, include: { model: User } },
        { model: User, through: Admin }
      ],
    });
    res.json({ spots });
  })
);

router.post('/',
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const dataObj = req.body.spot;
    if (req.user.id !== dataObj.userId) {
      return next(serverError(401, 'Admin Error', ["Unauthorized user"]));
    }
    delete dataObj.userId;
    try {
      let spots = await Spot.create(dataObj);
      let err;
      let admin;
      try {
        admin = await Admin.build({ userId: req.user.id, spotId: spot.id });
        await admin.save();
      } catch (e) {
        return next(serverError(401, 'Admin Error', ["Cancelled"]));
      }
      spots = await Spot.findByPk(spots.id, {
        include: [
          { model: Review, include: { model: User } },
          { model: User, through: Admin }
        ],
      })
      let ret = { spots };
      if (admin) ret.admin = admin;
      if (err) ret.error = err;
      res.json(ret);
    } catch (error) {
      return next(serverError(401, 'Admin creating failed', ["Could not create admin", error]));
    }
  })
);

module.exports = router;
