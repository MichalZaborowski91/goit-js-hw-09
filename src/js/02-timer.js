'use strict';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');
const dataInput = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');

startBtn.disabled = true;
let timerId = null;

function convertMs(ms) {
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

const addLeadingZero = value => String(value).padStart(2, 0);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= new Date()) {
      startBtn.disabled = true;
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    }
    startBtn.disabled = false;
    function newTime() {
      const actualDate = new Date();
      const selectedDate = new Date(selectedDates[0]);
      const differenceDate = selectedDate - actualDate;
      const { days, hours, minutes, seconds } = convertMs(differenceDate);
      dataDays.textContent = addLeadingZero(days);
      dataHours.textContent = addLeadingZero(hours);
      dataMinutes.textContent = addLeadingZero(minutes);
      dataSeconds.textContent = addLeadingZero(seconds);

      if (
        dataDays.textContent === '00' &&
        dataHours.textContent === '00' &&
        dataMinutes.textContent === '00' &&
        dataSeconds.textContent === '00'
      ) {
        clearInterval(timerId);
        Notiflix.Notify.success('Countdown finished');
      }
    }
    function timeCount() {
      newTime();
      startBtn.disabled = true;
      timerId = setInterval(newTime, 1000);
    }
    startBtn.addEventListener('click', timeCount);
  },
};

flatpickr(dataInput, options);
