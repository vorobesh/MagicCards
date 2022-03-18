const router = require('express').Router();

const {
  Card, Condition, User, City, 
} = require('../../db/models');

router.get('/', async (req, res) => {
  // const { id } = req.session.user;
  const { ids } = req.query;
  const request = new Set(ids.split(','));
  let cardsBasket = await [...request].map(async (el) => {
    const elNew = await Card.findOne({ where: { id: el }, raw: true, include: Condition });
    return elNew;
  });
  cardsBasket = await Promise.all(cardsBasket);
  console.log('cardsBasket', cardsBasket);
  res.render('basket', { cardsBasket, layout: false });
});

module.exports = router;
