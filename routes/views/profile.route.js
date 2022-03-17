const router = require('express').Router();
const {
  Card, Condition, User, City,
} = require('../../db/models');

router.get('/', async (req, res) => {
  const { id } = req.session.user;
  const userInfo = await User.findOne({ where: { id }, raw: true, include: City });
  userInfo.city = userInfo['City.city_name'];
  const myCards = await Card.findAll({ where: { id_user: id }, raw: true, include: Condition });
  console.log(myCards, userInfo);
  res.render('profile', { myCards, userInfo });
});

router.get('/new', (req, res) => {
  res.render('cardNew');
});

module.exports = router;
