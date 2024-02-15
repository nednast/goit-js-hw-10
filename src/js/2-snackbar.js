import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
const delayInput = document.querySelector('input[name="delay"]');
const stateBtn = document.querySelectorAll('input[name="state"]');
const form = document.querySelector('.form');

form.addEventListener('submit', e => {
  e.preventDefault();
  const delay = parseInt(delayInput.value, 10);
  const state = Array.from(stateBtn).find(btn => btn.checked);
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state.value === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
    form.reset();
  });

  promise
    .then(delay => {
      iziToast.show({
        message: `✅ Fulfilled promise in ${delay}ms`,
        messageColor: 'white',
        backgroundColor: '#59A10D',
        position: 'topRight',
      });
    })
    .catch(delay => {
      iziToast.show({
        message: `❌ Rejected promise in ${delay}ms`,
        messageColor: 'white',
        backgroundColor: '#FF6161',
        position: 'topRight',
      });
    });
});
