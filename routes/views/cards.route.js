const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('cards');
});

router.get('/new', (req, res) => {
  res.render('cardNew');
});

module.exports = router;
