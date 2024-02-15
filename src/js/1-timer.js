import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const btnStart = document.querySelector('button');
const input = document.querySelector('input');
const day = document.querySelector('.value[ data-days]');
const hour = document.querySelector('.value[ data-hours]');
const minute = document.querySelector('.value[ data-minutes]');
const second = document.querySelector('.value[ data-seconds]');

btnStart.disabled = true;

let userSelectedDate;
let difference;
let intervalId;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    //console.log(selectedDates[0]);
    userSelectedDate = selectedDates[0];
    if (userSelectedDate < Date.now()) {
      iziToast.show({
        message: 'Please choose a date in the future',
        messageColor: 'white',
        backgroundColor: 'red',
        position: 'topRight',
      });
      btnStart.disabled = true;
      btnStart.style.background = '';
      btnStart.style.color = '';
    } else {
      btnStart.disabled = false;
      btnStart.style.background = 'blue';
      btnStart.style.color = 'white';
    }
  },
};

flatpickr('#datetime-picker', options);

btnStart.addEventListener('click', e => {
  btnStart.disabled = true;
  input.disabled = true;
  btnStart.style.background = '';
  btnStart.style.color = '';
  difference = userSelectedDate - Date.now();
  intervalId = setInterval(() => {
    tick(convertMs(difference));
    difference -= 1000;
    if (difference <= 0) {
      clearInterval(intervalId);
    }
  }, 1000);
});

function tick({ days, hours, minutes, seconds }) {
  day.textContent = `${addLeadingZero(days)}`;
  hour.textContent = `${addLeadingZero(hours)}`;
  minute.textContent = `${addLeadingZero(minutes)}`;
  second.textContent = `${addLeadingZero(seconds)}`;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
