/* eslint-disable camelcase */
const router = require('express').Router();
const path = require('path');
const multer = require('multer');
const {
  Card,
} = require('../../db/models');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(process.env.PWD, 'public/images'));
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage,
});

router.post('/new', upload.single('card_url'), async (req, res) => {
  try {
    const {
      card_name,
      card_price,
      id_condition,
    } = req.body;

    const fileName = req.file.originalname;

    const { id } = req.session.user;
    if (id && card_price && id_condition && card_name && fileName) {
      await Card.create({
        card_name,
        card_price: +card_price,
        id_condition,
        card_url: `/images/${fileName}`,
        id_user: id,
      });
      res.status(200).json({
        message: 'Карточка добавлена на сайт',
      });
    } else {
      res.status(400).json({
        message: 'Ошибка ввода данных',
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: 'Ошибка создания карточки',
    });
  }
});

module.exports = router;
