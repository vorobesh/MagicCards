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

router.get('/:id/edit', async (req, res) => {
  const card = await Card.findOne({ where: { id: req.params.id }, raw: true, include: Condition });
  res.json(card);
});

router.get('/:id/delete', async (req, res) => {
  try {
    const card = await Card.findByPk(req.params.id);
    await card.destroy();
    res.json({ status: 'DELETED' });
  } catch (error) {
    res.render('error', { error });
  }
});

router.put('/:id/edit', async (req, res) => {
  try {
    const { card_name, card_price, id_condition } = req.body;
    console.log(card_name, card_price, id_condition);
    const card = await Card.findOne({ where: { id: req.params.id } });
    card.card_name = card_name;
    card.card_price = card_price;
    card.id_condition = id_condition;
    await card.save();
    res.json({ result: 1 });
  } catch (error) {
    res.render('error', { error });
  }
});

module.exports = router;
