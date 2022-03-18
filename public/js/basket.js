const container1 = document.querySelector('#cards');
// const clearBasket = document.querySelector('#clearBasket');

container1.addEventListener('click', async (event) => {
  event.preventDefault();
  if (event.target.classList.contains('btn-buy')) {
    if (!localStorage.basket) {
      const basket = [];
      basket.push(event.target.dataset.id);
      localStorage.setItem('basket', JSON.stringify(basket));
    } else {
      const basket = JSON.parse(localStorage.getItem('basket'));
      if (!basket.includes(event.target.dataset.id)) {
        basket.push(event.target.dataset.id);
        localStorage.setItem('basket', JSON.stringify(basket));
      }
    }
  }
});

// clearBasket.addEventListener('submit', async (event) => {
//   event.preventDefault();
//   localStorage.setItem('basket', JSON.stringify([]));
//   // window.location.href = 'http://localhost:3000/cards';
// });
