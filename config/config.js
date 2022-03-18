const express = require('express');
const logger = require('morgan');
const path = require('path');
const hbs = require('hbs');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

function config(app) {
  const sessionConfig = {
    store: new FileStore(),
    name: 'user_sid', // Имя куки для хранения id сессии. По умолчанию - connect.sid
    secret: 'test', // Секретное слово для шифрования, может быть любым
    resave: false, // Пересохранять ли куку при каждом запросе
    saveUninitialized: false, // Создавать ли сессию без инициализации ключей в req.session
    cookie: {
      maxAge: 1000 * 60 * 60 * 12, // Срок истечения годности куки в миллисекундах
      httpOnly: true, // Серверная установка и удаление куки, по умолчанию true
      // path: '/count'
    },
  };

  hbs.registerHelper('ifCond', function (v1, v2, options) {
    if (v1 === v2) {
      return options.fn(this);
    }
    return options.inverse(this);
  });

  hbs.registerPartials(path.join(process.env.PWD, '/views/partials'));
  app.set('view engine', 'hbs');
  app.set('views', path.join(process.env.PWD, 'views'));

  app.use(logger('dev'));
  app.use(express.static(path.join(process.env.PWD, 'public')));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(session(sessionConfig));
  app.use(cookieParser());
}

module.exports = config;
