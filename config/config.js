const express = require('express');
const logger = require('morgan');
const path = require('path');
const hbs = require('hbs');

function config(app) {
  hbs.registerPartials(path.join(process.env.PWD, '/views/partials'));
  app.set('view engine', 'hbs');
  app.set('views', path.join(process.env.PWD, 'views'));

  app.use(logger('dev'));
  app.use(express.static(path.join(process.env.PWD, 'public')));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
}

module.exports = config;
