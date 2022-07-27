const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');

const settings = {
	dimensions: [ 1080, 1080 ]
};

let manager;

let text = 'A';
let fontSize = 1200;
let fontFamily = 'serif';

//creating a small canvas with the letter to represent with different shapes.
const typeCanvas = document.createElement('canvas');
const typeContext = typeCanvas.getContext('2d');

const sketch = ({ context, width, height }) => {
	const cell = 20; // size of a pixel of the type canvas in the main one.
	const cols = Math.floor(width  / cell); // for every pixel in the typeCanvas we'll get one pixel in the main canvas
	const rows = Math.floor(height / cell);
	const numCells = cols * rows;

	typeCanvas.width  = cols;
	typeCanvas.height = rows;

	return ({ context, width, height }) => {
		typeContext.fillStyle = 'black';
		typeContext.fillRect(0, 0, cols, rows);

		fontSize = cols * 1.2;
    // fontSize = cols * 0.3;

		typeContext.fillStyle = 'white';
		typeContext.font = `${fontSize}px ${fontFamily}`;
		typeContext.textBaseline = 'top';

		const metrics = typeContext.measureText(text);
		console.log("metrics ", metrics);
		const mx = metrics.actualBoundingBoxLeft * -1;
		const my = metrics.actualBoundingBoxAscent * -1;
		const mw = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight;
		const mh = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

		const tx = (cols - mw) * 0.5 - mx;
		const ty = (rows - mh) * 0.5 - my;
		console.log('mx: ',mx);
		console.log('my: ',my);
		console.log('mw: ',mw);
		console.log('mh: ',mh);
		console.log('tx: ',tx);
		console.log('ty: ',ty);
		console.log('cols: ',cols);
		console.log('rows: ',rows);
		typeContext.save();
		typeContext.translate(tx, ty);

		typeContext.beginPath();
		typeContext.rect(mx, my, mw, mh);
		typeContext.stroke();

		typeContext.fillText(text, 0, 0);
		typeContext.restore();
		// reading the type canvas letter shape infos
		const typeData = typeContext.getImageData(0, 0, cols, rows).data;


		context.fillStyle = 'black';
		context.fillRect(0, 0, width, height);

		context.textBaseline = 'middle';
		context.textAlign = 'center';

		// context.drawImage(typeCanvas, 0, 0);
		//reading data from type canvas and converting it in the main canvas.
		for (let i = 0; i < numCells; i++) {
			const col = i % cols;
			const row = Math.floor(i / cols);

			const x = col * cell;
			const y = row * cell;

			const r = typeData[i * 4 + 0]; // i is the pixel index of type canvas, data is rgba : 4 channels.
			const g = typeData[i * 4 + 1];
			const b = typeData[i * 4 + 2];
			const a = typeData[i * 4 + 3];

			// context.fillStyle = `${r}, ${g}, ${b}, ${a}`; this one and ...

			const glyph = getGlyph(r);

			context.font = `${cell * 2}px ${fontFamily}`;
			if (Math.random() < 0.1) context.font = `${cell * 4}px ${fontFamily}`;

			context.fillStyle = 'white';

			context.save();
			context.translate(x, y);
			context.translate(cell * 0.5, cell * 0.5);

			// context.fillRect(0, 0, cell, cell); ... this one would give a pixelated version of the letter.

			context.fillText(glyph, 0, 0);
			
			context.restore();

		}
	};
};

const getGlyph = (v) => {
	if (v < 50) return '';
	// if (v < 100) return ';';
	// if (v < 150) return '{';
	// if (v < 200) return '}';
  if (v < 100) return '.';
	if (v < 150) return '-';
	if (v < 200) return '+';

	// const glyphs = '_= /'.split('');
	const glyphs = '_,=, ,/'.split(',');
	// const glyphs = '/,*,<,>, ,applio'.split(',');

	return random.pick(glyphs);
};


const onKeyUp = (e) => {
	// text = `${text}${e.key.toUpperCase()}`;
	text = e.key.toUpperCase();
	manager.render();
};

document.addEventListener('keyup', onKeyUp);


const start = async () => {
	manager = await canvasSketch(sketch, settings);
};

start();





/*
const url = 'https://picsum.photos/200';

const loadMeSomeImage = (url) => {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.onload = () => resolve(img);
		img.onerror = () => reject();
		img.src = url;
	});
};

const start = async () => {
	const img = await loadMeSomeImage(url);
	console.log('image width', img.width);
	console.log('this line');
};

// const start = () => {
// 	loadMeSomeImage(url).then(img => {
// 		console.log('image width', img.width);
// 	});
// 	console.log('this line');
// };


start();
*/
