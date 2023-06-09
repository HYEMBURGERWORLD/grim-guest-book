'use strict';

// set canvas & ctx
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

/** ************************* */
/**         constant          */
/** ************************* */

const COLOR_WHITE = 'white';
const BRUSH_SHAPE = 'round';

const CANVAS_WIDTH = 700;
const CANVAS_HEIGHT = 700;

const text = document.getElementById('text');

// color
const color = document.getElementById('color');
const colorOptions = Array.from(document.getElementsByClassName('color-option'));

// btns
const eraserBtn = document.getElementById('eraser');
const clearBtn = document.getElementById('clear');
const fillBtn = document.getElementById('fill');
const saveBtn = document.getElementById('save');
const uploadBtn = document.getElementById('upload');
const sprayBtn = document.getElementById('spray');
const brushBtn = document.getElementById('brush');
const undoBtn = document.getElementById('undo');
const redoBtn = document.getElementById('redo');
const sizeBtn = document.getElementById('size');
const opacityBtn = document.getElementById('opacity');
const recordBtn = document.getElementById('record');

/** ************************* */
/**           setting          */
/** ************************* */

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

// brush shape (default is round pen)
ctx.lineCap = BRUSH_SHAPE;
ctx.lineJoin = BRUSH_SHAPE;

// brush size (default)
const brushSize = document.getElementById('size').value;
ctx.lineWidth = brushSize;

// brush color (default)
const brushColor = document.getElementById('color').value;
ctx.strokeStyle = brushColor;

// auto fill white (background color is white!)
const autoWhiteBack = () => {
  ctx.fillStyle = COLOR_WHITE;
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
};

/** ************************* */
/**         variable          */
/** ************************* */

let recordStorage =
  JSON.parse(localStorage.getItem('record')) == null
    ? []
    : JSON.parse(localStorage.getItem('record'));

let isDrawing = false;
let isSpray = false; // spray

let undoList = [];
let redoList = [];

/** ************************* */
/**      local Storage        */
/** ************************* */

function confirmRecord() {
  if (confirm('do you want to record?')) {
    toggleModalBox();
    toggleModal();
    const confirmBtn = document.getElementById('confirm');
    text.innerText = 'Set the password';
    confirmBtn.innerText = 'CONFIRM';
    confirmBtn.addEventListener('click', recordInGuestBook);
  }
}

function recordInGuestBook(e) {
  e.preventDefault();
  const url = canvas.toDataURL();
  const pw = document.getElementById('pw');
  const obj = {
    img: url,
    date: new Date(),
    id: Date.now(),
    pw: pw.value,
  };
  recordStorage.push(obj);
  localStorage.setItem('record', JSON.stringify(recordStorage));

  pw.value = '';
  autoWhiteBack();

  toggleModalBox();
  const goBtn = document.getElementById('go');
  text.innerText = 'I recorded your wonderful painting!';
  goBtn.classList.toggle('hidden');
  goBtn.addEventListener('click', () => {
    toggleModal();
    location.href = 'record.html';
  });
}

/** ************************* */
/**         function          */
/** ************************* */

// default background color
autoWhiteBack();

// Drawing now?
function startDrawing() {
  isDrawing = true;
}

function stopDrawing(e) {
  isDrawing = false;
  if (e.type !== 'mouseleave') saveHistory();
}

function moveBrush(e) {
  if (isDrawing && !isSpray) {
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    return;
  } else if (isDrawing && isSpray) {
    generateSprayPoints(e);
    return;
  }

  // just move
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
}

// Brush ?
function startSpray() {
  isSpray = true;
}

function stopSpray() {
  isSpray = false;
}

// spray
function getRandomOffset(radius) {
  const randomAngle = Math.random() * (2 * Math.PI);
  const randomRadius = Math.random() * radius;

  return {
    x: Math.cos(randomAngle) * randomRadius,
    y: Math.sin(randomRadius) * randomAngle,
  };
}

function generateSprayPoints(e) {
  const amountOfPoints = ctx.lineWidth * 2;
  for (let i = 0; i < amountOfPoints; i++) {
    const offset = getRandomOffset(ctx.lineWidth * 2);
    const x = e.offsetX + offset.x;
    const y = e.offsetY + offset.y;

    ctx.fillStyle = color.value;
    ctx.fillRect(x, y, 1, 1);
  }
}

// btn handler
function eraserHandler() {
  ctx.strokeStyle = COLOR_WHITE;
}

function changeColorHandler(e) {
  ctx.fillStyle = e.target.value;
  ctx.strokeStyle = e.target.value;
}

function fillHandler() {
  ctx.fillStyle = color.value;
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  saveHistory();
}

function clearHandler() {
  if (confirm('Do you want All Clear ?')) {
    ctx.globalAlpha = 1;
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    autoWhiteBack();
    ctx.globalAlpha = opacityBtn.value;
  }
}

function saveComHandler() {
  const url = canvas.toDataURL();
  const a = document.createElement('a');
  a.href = url;
  a.download = 'unknown.png';
  a.click();
}

function uploadComImgHandler(e) {
  const file = e.target.files[0];
  const url = URL.createObjectURL(file); // make url
  const img = new Image(); // <img src = ""/>
  img.src = url;
  img.onload = () => {
    ctx.drawImage(img, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    uploadBtn.value = '';
  };
  saveHistory();
}

function selectColorOptionHandler(e) {
  const colorOption = e.target.dataset.color;
  ctx.fillStyle = colorOption;
  ctx.strokeStyle = colorOption;
  color.value = colorOption;
}

function saveHistory() {
  // for undoList
  const historyData = ctx.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  undoList.push(historyData);
}

function undoHandler() {
  if (undoList.length === 0) {
    autoWhiteBack();
    console.log('뒤로갈 데이터가 더이상 업슴!');
  } else {
    ctx.putImageData(undoList[undoList.length - 1], 0, 0);
    redoList.push(undoList.pop());
    console.log('undo 성공!');
  }
}

function redoHandler() {
  if (redoList.length === 0) {
    return; // no data.
  } else {
    ctx.putImageData(redoList[redoList.length - 1], 0, 0);
    undoList.push(redoList.pop());
  }
}

function changeSizeHandler(e) {
  const size = e.target.value;
  ctx.lineWidth = size;
}

function opacityHandler(e) {
  const opacity = e.target.value;
  ctx.globalAlpha = Number(opacity);
}

/** ************************* */
/**       event listner       */
/** ************************* */

// Drawing now?
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseleave', stopDrawing);
canvas.addEventListener('mousemove', moveBrush);

// btn
opacityBtn.addEventListener('change', opacityHandler);
sizeBtn.addEventListener('change', changeSizeHandler);
undoBtn.addEventListener('click', undoHandler);
redoBtn.addEventListener('click', redoHandler);
brushBtn.addEventListener('click', stopSpray);
sprayBtn.addEventListener('click', startSpray);
color.addEventListener('change', changeColorHandler);
eraserBtn.addEventListener('click', eraserHandler);
clearBtn.addEventListener('click', clearHandler);
fillBtn.addEventListener('click', fillHandler);
saveBtn.addEventListener('click', saveComHandler);
uploadBtn.addEventListener('change', uploadComImgHandler);
colorOptions.forEach((colorOption) => {
  colorOption.addEventListener('click', selectColorOptionHandler);
});

// record
recordBtn.addEventListener('click', confirmRecord);
