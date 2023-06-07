'use strict';

let record = JSON.parse(localStorage.getItem('record'));

function createHtmlElement(record) {
  const li = document.createElement('li');
  const img = document.createElement('img');
  const button = document.createElement('button');
  const records = document.getElementById('records');

  img.id = record.id;
  img.src = record.img;
  button.innerHTML = '<i class="ph-fill ph-trash-simple"></i>';

  li.classList.add('record');
  img.classList.add('record-img');
  button.classList.add('del-btn');
  button.classList.add('hidden');

  li.appendChild(img);
  li.appendChild(button);
  records.appendChild(li);
}

function seeRecord() {
  for (let i = 0; i < record.length; i++) {
    createHtmlElement(record[i]);
  }
}

function delRecord(e) {
  const id = e.target.parentElement.previousElementSibling.id;
  const li = e.target.parentElement;
  const pw = record.filter((img) => img.id === Number(id))[0].pw;

  // 비밀번호 확인
  checkPw(pw, id, li);
}

function checkPw(pw, id, li) {
  // 모달창 활용
  toggleModal();
  const confirmPw = document.getElementById('confirmPw');
  const text = document.getElementById('text');
  text.innerText = 'password?';
  confirmPw.addEventListener('click', () => {
    const inputPw = document.getElementById('pw');
    if (inputPw.value === pw) {
      li.remove();
      record = record.filter((img) => img.id !== Number(id));
      delStorage();
      inputPw.value = '';
      toggleModal();
    } else {
      inputPw.value = '';
      text.innerText = 'password is wrong!';
    }
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

const recordItem = Array.from(document.getElementsByClassName('record'));
recordItem.forEach((item) => {
  item.addEventListener('mouseover', () => {
    item.lastChild.classList.toggle('hidden');
  });
  item.addEventListener('mouseout', () => {
    item.lastChild.classList.toggle('hidden');
  });
});
