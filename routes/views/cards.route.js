const router = require('express').Router();
const { Card, Condition } = require('../../db/models');

router.get('/', async (req, res) => {
  const allCards = await Card.findAll({ raw: true, include: Condition });
  console.log(allCards);
  res.render('cards', allCards);
});

router.get('/new', (req, res) => {
  res.render('cardNew');
});

module.exports = router;
