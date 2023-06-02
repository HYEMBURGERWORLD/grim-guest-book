'use strict';

const today = new Date();
console.log(today);

const year = today.getFullYear();
const month = today.getMonth() + 1;
const date = today.getDate();

const span = document.getElementById('date');
span.innerText = `${year}.${month}.${date}`;
