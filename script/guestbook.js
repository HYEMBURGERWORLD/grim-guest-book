'use strict';

const record = JSON.parse(localStorage.getItem('record'));

function createHtmlElement(record) {
  const li = document.createElement('li');
  const img = document.createElement('img');
  const button = document.createElement('button');
  const records = document.getElementById('records');

  img.id = record.id;
  img.src = record.img;
  button.innerText = 'X';
  button.id = 'del';

  li.classList.add('record');
  img.classList.add('record-img');
  button.classList.add('record-btn');

  li.appendChild(button);
  li.appendChild(img);
  records.appendChild(li);
}

function seeRecord() {
  for (let i = 0; i < record.length; i++) {
    createHtmlElement(record[i]);
  }
}

seeRecord();
