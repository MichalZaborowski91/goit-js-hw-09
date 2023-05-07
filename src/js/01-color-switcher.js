'use strict';

const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

startBtn.addEventListener('click', changeColor);
stopBtn.addEventListener('click', stopColor);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
function bodyColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}

let timerId = null;

function changeColor() {
  startBtn.disabled = true;
  stopBtn.disabled = false;
  bodyColor();
  timerId = setInterval(bodyColor, 1000);
}
function stopColor() {
  clearInterval(timerId);
  startBtn.disabled = false;
  stopBtn.disabled = true;
}
