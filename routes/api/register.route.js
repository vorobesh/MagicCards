/* eslint-disable camelcase */
const router = require('express').Router();
const bcrypt = require('bcrypt');

const saltRounds = 10;

const {
  User,
} = require('../../db/models');

router.route('/')
  .post(async (req, res) => {
    try {
      const {
        user_name,
        user_email,
        user_password,
        id_city,
      } = req.body;

      const user = await User.findOne({
        where: {
          user_email,
        },
      });

      if (!user) {
        const hashPassword = await bcrypt.hash(user_password, saltRounds);
        // req.session?
        await User.create({
          user_name,
          user_email,
          user_password: hashPassword,
          id_city,
        });
        res.status(200).json({
          message: 'Пользователь успешно зарегистрирован',
        });
      } else {
        res.status(409).json({
          message: 'Пользователь с таким email уже зарегистрирован',
        });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({
        message: 'Ошибка регистрации',
      });
    }
  });

module.exports = router;
