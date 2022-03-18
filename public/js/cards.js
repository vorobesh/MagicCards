const container = document.querySelector('#cards');
const editForm = document.querySelector('#editForm');
const submitBtn = document.querySelector('#submitBtn');

container.addEventListener('click', async (event) => {
  event.preventDefault();
  if (event.target.classList.contains('btn-edit')) {
    console.log('EDIT', event.target.dataset.id);
    let response = await fetch(`/cards/${event.target.dataset.id}/edit`);
    response = await response.json();
    console.log(response);
    submitBtn.dataset.id = event.target.dataset.id;
    editForm.card_name.value = response.card_name;
    editForm.card_price.value = response.card_price;
    editForm.id_condition.value = response.id_condition;
    // console.log(response, editForm);
  }
  if (event.target.classList.contains('btn-delete')) {
    let response = await fetch(`/cards/${event.target.dataset.id}/delete`);
    response = await response.json();
    if (response.status) window.location.href = '/cards';
  }
});

submitBtn.addEventListener('click', async (event) => {
  const {
    card_name,
    card_price,
    id_condition,
  } = editForm;
  let response = await fetch(`/cards/${event.target.dataset.id}/edit`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      card_name: card_name.value,
      card_price: card_price.value,
      id_condition: id_condition.value,
    }),
  });
  response = await response.json();
  if (response.result) window.location.href = '/profile';
});
