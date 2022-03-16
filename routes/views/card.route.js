const { Card } = require('../db/models');

const router = require('express').Router();

router.get('/cards', (req, res) => {
  res.render('partials/card-create');
});
