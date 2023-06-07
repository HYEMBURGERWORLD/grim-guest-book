'use strict';
const pwNum = Array.from(document.getElementsByClassName('pw-num'));
const modal = document.getElementById('modal');

function toggleModal() {
  modal.classList.toggle('hidden');
  if (!modal.classList.contains('hidden')) {
    const close = document.getElementById('close');
    close.addEventListener('click', toggleModal);
  }
}

function whatNumber(e) {
  const num = e.target.dataset.pw;
  const input = document.getElementById('pw');
  pw.value += num;
}

pwNum.forEach((pw) => {
  pw.addEventListener('click', whatNumber);
});
