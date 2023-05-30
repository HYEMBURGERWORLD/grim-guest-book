'use strict';

/** ************************* */
/**         variable          */
/** ************************* */

let isDrawing = false;
let isSpray = false; // spray

/** ************************* */
/**         constant          */
/** ************************* */

const COLOR_WHITE = 'white';
const BRUSH_SHAPE = 'round';

const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 500;

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

/** ************************* */
/**           canvas          */
/** ************************* */

// set canvas & ctx
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

// auto fill white (background color is white!)
ctx.fillStyle = COLOR_WHITE;
ctx.fillRect = (0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
ctx.fill();

// brush shape (default is round pen)
ctx.lineCap = BRUSH_SHAPE;
ctx.lineJoin = BRUSH_SHAPE;

// brush size (default)
const brushSize = document.getElementById('size').value;
ctx.lineWidth = brushSize;

// brush color (default)
const brushColor = document.getElementById('color').value;
ctx.strokeStyle = brushColor;

/** ************************* */
/**         function          */
/** ************************* */
// Drawing now?
function startDrawing() {
  isDrawing = true;
}

function stopDrawing() {
  isDrawing = false;
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
  ctx.fillRect = (0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.fill();
}

function clearHandler() {
  if (confirm('Do you want All Clear ?')) {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // clear -> auto fill
    ctx.fillStyle = COLOR_WHITE;
    ctx.fillRect = (0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.fill();
  }
}

function saveComHandler() {
  const url = canvas.toDateURL();
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
}

function selectColorOptionHandler(e) {
  const colorOption = e.target.dateset.color;
  ctx.fillStyle = colorOption;
  ctx.strokeStyle = colorOption;
  color.value = colorOption;
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
