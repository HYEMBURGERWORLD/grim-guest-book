'use strict';
const pwNum = Array.from(document.getElementsByClassName('pw-num'));

function whatNumber(e) {
  const num = e.target.dataset.pw;
  const input = document.getElementById('pw');
  pw.value += num;
}

pwNum.forEach((pw) => {
  pw.addEventListener('click', whatNumber);
});
