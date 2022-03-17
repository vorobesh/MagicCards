const router = require('express').Router();
const { Condition, Card } = require('../../db/models');

router.get('/', async (req, res) => {
  let allCards = await Card.findAll({ raw: true, include: Condition });
  const { user } = req.session;
  allCards = allCards.map((x) => ({ ...x, condition: x['Condition.condition_name'], user }));
  res.render('cards', { allCards });
});

router.get('/new', (req, res) => {
  res.render('cardNew');
});

module.exports = router;
