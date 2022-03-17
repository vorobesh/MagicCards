const router = require('express').Router();
const {
  Card, Condition, User, City,
} = require('../../db/models');

router.get('/', async (req, res) => {
  const { id } = req.session.user;
  const uesrInfo = await User.findOne({ where: { id }, raw: true, include: City });
  const myCards = await Card.findAll({ where: { id_user: id }, raw: true, include: Condition });
  console.log(myCards, uesrInfo);
  res.send('work');
});

router.get('/new', (req, res) => {
  res.render('cardNew');
});

module.exports = router;
