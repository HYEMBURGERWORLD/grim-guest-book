'use strict';

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

/** ************************* */
/**       event listner       */
/** ************************* */
