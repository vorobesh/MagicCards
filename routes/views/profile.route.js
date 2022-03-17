const router = require('express').Router();
const { Card, Condition, User } = require('../../db/models');

router.get('/', async (req, res) => {
  const { id } = req.session.user;
  const MyCards = await Card.findAll({ where: { id_user: id }, raw: true, include: Condition });
  console.log(MyCards);
  res.render('cards', MyCards);
});

router.get('/new', (req, res) => {
  res.render('cardNew');
});

module.exports = router;
