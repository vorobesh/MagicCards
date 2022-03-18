/* eslint-disable max-len */
const express = require('express');
const createError = require('http-errors');
const config = require('./config/config');

// Импортируем созданный в отдельный файлах роутеры.
const mainRouterView = require('./routes/views/main.route');
const registerRouterView = require('./routes/views/register.route');
const registerRouterApi = require('./routes/api/register.route');
const loginRouterView = require('./routes/views/login.route');
const loginRouterApi = require('./routes/api/login.route');
const cardsRouteApi = require('./routes/api/cards.route');
const cardsRouteView = require('./routes/views/cards.route');
const logoutRouteApi = require('./routes/api/logout.route');
const profileRouteView = require('./routes/views/profile.route');
const basketRouteView = require('./routes/views/basket.route');

const app = express();
const PORT = process.env.PORT ?? 3000;

config(app);

app.use((req, res, next) => {
  console.log(req.session);
  if (req.session.user) {
    res.locals.user = req.session.user;
  }
  next();
});

app.use('/', mainRouterView);
app.use('/cards', cardsRouteView);
app.use('/cards', cardsRouteApi);
app.use('/registration', registerRouterView);
app.use('/registration', registerRouterApi);
app.use('/login', loginRouterView);
app.use('/login', loginRouterApi);
app.use('/logout', logoutRouteApi);
app.use('/profile', profileRouteView);
app.use('/basket', basketRouteView);

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
