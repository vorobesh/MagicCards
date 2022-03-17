const container = document.querySelector('#cards');

container.addEventListener('click', async (event) => {
  event.preventDefault();
  if (event.target.classList.contains('btn-edit')) {
    console.log('EDIT', event.target.dataset.id);
    const response = await fetch(`/cards/:${event.target.dataset.id}/edit`);
  }
});
