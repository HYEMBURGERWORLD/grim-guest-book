'use strict';

let record = JSON.parse(localStorage.getItem('record'));

function createHtmlElement(record) {
  const li = document.createElement('li');
  const img = document.createElement('img');
  const span = document.createElement('span');
  const records = document.getElementById('records');

  img.id = record.id;
  img.src = record.img;
  span.innerText = 'X';
  span.id = 'del';

  li.classList.add('record');
  img.classList.add('record-img');
  span.classList.add('del-btn');

  li.appendChild(img);
  li.appendChild(span);
  records.appendChild(li);
}

function seeRecord() {
  for (let i = 0; i < record.length; i++) {
    createHtmlElement(record[i]);
  }
}

function delRecord(e) {
  const id = e.target.previousElementSibling.id;
  const li = e.target.parentElement;
  const pw = record.filter((img) => img.id === Number(id))[0].pw;

  // 비밀번호 확인
  checkPw(pw, id, li);
}

function checkPw(pw, id, li) {
  // 모달창 활용
  onModal();
  const confirmPw = document.getElementById('confirmPw');
  confirmPw.addEventListener('click', () => {
    const inputPw = document.getElementById('pw').value;
    if (inputPw === pw) {
      li.remove();
      record = record.filter((img) => img.id !== Number(id));
      delStorage();
    } else {
      console.log('xxx');
    }
    offModal();
  });
}

function delStorage() {
  localStorage.setItem('record', JSON.stringify(record));
}

seeRecord();
const delBtn = Array.from(document.getElementsByClassName('del-btn'));
delBtn.forEach((btn) => {
  btn.addEventListener('click', delRecord);
});
