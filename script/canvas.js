'use strict';

/** ************************* */
/**         variable          */
/** ************************* */

let isDrawing = false;

/** ************************* */
/**         constant          */
/** ************************* */

const COLOR_WHITE = 'white';

// btns
const eraserBtn = document.getElementById('eraser');

/** ************************* */
/**           canvas          */
/** ************************* */

// set canvas & ctx
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 500;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

// auto fill white (background color is white!)
ctx.fillStyle = COLOR_WHITE;
ctx.fillRect = (0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
ctx.fill();

// brush shape (default is round pen)
const BRUSH_SHAPE = 'round';
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
  if (isDrawing) {
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    return;
  }

  // just move
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
}

// btn handler
function eraserHandler() {
  ctx.strokeStyle = COLOR_WHITE;
}

/** ************************* */
/**       event listner       */
/** ************************* */

// Drawing now?
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseleave', stopDrawing);
canvas.addEventListener('mousemove', moveBrush);

// btn handler
eraserBtn.addEventListener('click', eraserHandler);
