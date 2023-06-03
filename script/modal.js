'use strict';
const pwNum = Array.from(document.getElementsByClassName('pw-num'));
const modal = document.getElementById('modal');

function onModal() {
  modal.classList.remove('hidden');
  const close = document.getElementById('close');
  close.addEventListener('click', offModal);
}

function offModal() {
  modal.classList.add('hidden');
}

function whatNumber(e) {
  const num = e.target.dataset.pw;
  const input = document.getElementById('pw');
  pw.value += num;
}

pwNum.forEach((pw) => {
  pw.addEventListener('click', whatNumber);
});
