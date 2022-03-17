/* eslint-disable camelcase */
const formRegistration = document.querySelector('#formRegistration');
const errorMessageRegistration = document.querySelector('#errorMessageRegistration');
const formLogin = document.querySelector('#formLogin');
const errorMessageLogin = document.querySelector('#errorMessageLogin');
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
      window.location.href = '/cards';
    } else { errorMessageLogin.innerHTML = responseJson.message; }
  });
}
