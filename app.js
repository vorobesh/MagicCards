/* eslint-disable max-len */
const express = require('express');
const createError = require('http-errors');
// const path = require('path');

// Импортируем созданный в отдельный файлах рутеры.
const config = require('./config/config');

const app = express();
const PORT = process.env.PORT ?? 3000;

config(app);
//home
app.get('/', (req, res) => {
  res.render('home')
});

//registration
app.get('/reg', (req, res) => {
  res.render('reg')
});

//login
app.get('/login', (req, res) => {
  res.render('home')
});
//logout
app.get('/logout', (req, res) => {
  res.render('home')
});
//cabinet
app.get('/profile', (req, res) => {
  res.render('home')
});

// Если HTTP-запрос дошёл до этой строчки, значит ни один из ранее встречаемых рутов не ответил на запрос.Это значит, что искомого раздела просто нет на сайте. Для таких ситуаций используется код ошибки 404. Создаём небольшое middleware, которое генерирует соответствующую ошибку.
app.use((req, res, next) => {
  const error = createError(404, 'Запрашиваемой страницы не существует на сервере.');
  next(error);
});

// Отлавливаем HTTP-запрос с ошибкой и отправляем на него ответ.
app.use((err, req, res, next) => {
  // Получаем текущий ражим работы приложения.
  const appMode = req.app.get('env');
  // Создаём объект, в котором будет храниться ошибка.
  let error;
  // Если мы находимся в режиме разработки, то отправим в ответе настоящую ошибку. В противно случае отправим пустой объект.
  if (appMode === 'development') {
    error = err;
  } else {
    error = {};
  }

  // Записываем информацию об ошибке и сам объект ошибки в специальные переменные, доступные на сервере глобально, но только в рамках одного HTTP-запроса.
  res.locals.message = err.message;
  res.locals.error = error;

  // Задаём в будущем ответе статус ошибки. Берём его из объекта ошибки, если он там есть. В противно случае записываем универсальный стату ошибки на сервере - 500.
  res.status(err.status || 500);
  // Формируем HTML-текст из шаблона "error.hbs" и отправляем его на клиент в качестве ответа.
  res.render('error');
});

app.listen(PORT, () => {
  console.log(`server started PORT: ${PORT}`);
});
