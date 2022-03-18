/* eslint-disable camelcase */
const formRegistration = document.querySelector('#formRegistration');
const errorMessageRegistration = document.querySelector('#errorMessageRegistration');
const formLogin = document.querySelector('#formLogin');
const errorMessageLogin = document.querySelector('#errorMessageLogin');
const formCardNew = document.querySelector('#formCardNew');
const errorMessageCardNew = document.querySelector('#errorMessageCardNew');
const basket = document.querySelector('#basket');

if (formRegistration) {
  formRegistration.addEventListener('submit', async (event) => {
    event.preventDefault();
    const {
      user_name,
      user_email,
      user_password,
      id_city,
      action,
      method,
    } = event.target;
    const response = await fetch(action, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_name: user_name.value,
        user_email: user_email.value,
        user_password: user_password.value,
        id_city: id_city.value,
      }),
    });

    const responseJson = await response.json();
    errorMessageRegistration.innerHTML = responseJson.message;
  });
}

if (formLogin) {
  formLogin.addEventListener('submit', async (event) => {
    event.preventDefault();
    const {
      user_email,
      user_password,
      action,
      method,
    } = event.target;
    const response = await fetch(action, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_email: user_email.value,
        user_password: user_password.value,
      }),
    });

    const responseJson = await response.json();
    if (responseJson.message === 'Вы вошли в свой аккаунт') {
      errorMessageLogin.innerHTML = responseJson.message;
      setTimeout(() => { window.location.href = '/cards'; }, 1000);
    } else { errorMessageLogin.innerHTML = responseJson.message; }
  });
}

if (formCardNew) {
  formCardNew.addEventListener('submit', async (event) => {
    event.preventDefault();
    const {
      method,
      action,
    } = event.target;

    const data = new FormData(event.target);

    const response = await fetch(action, {
      method,
      body: data,
    });
    const responseJson = await response.json();
    if (responseJson.message === 'Карточка добавлена на сайт') {
      errorMessageCardNew.innerHTML = responseJson.message;
      setTimeout(() => {
        window.location.href = '/cards';
      }, 1000);
    } else {
      errorMessageCardNew.innerHTML = responseJson.message;
    }
  });
}

basket.addEventListener('click', async (event) => {
  event.preventDefault();
  const ids = JSON.parse(localStorage.getItem('basket'));
  const action = `/basket?ids=${ids.toString()}`;

  let response = await fetch(action);
  response = await response.text();
  const wrapper = document.querySelector('.wrapper');
  wrapper.innerHTML = response;
});
