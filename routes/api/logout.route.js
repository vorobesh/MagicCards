const router = require('express').Router();

router.route('/')
  .get((req, res) => {
    req.session.destroy();
    res.clearCookie('user_sid');
    res.redirect('/cards');
  });

module.exports = router;
