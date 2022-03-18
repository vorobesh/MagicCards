const router = require('express').Router();
const {
  City,
} = require('../../db/models');

router.route('/')
  .get(async (req, res) => {
    const cities = await City.findAll({
      raw: true,
    });

    res.render('registration', { cities });
  });

module.exports = router;
