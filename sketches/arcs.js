const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');


const settings = {
  dimensions: [ 1080, 1080 ]
};

const percent = ( val, per ) => {
  return val * (per / 100);
}

// const toRad = (angle) => {
//   return angle / 180 * Math.PI;
// }

// const randomRange = ( min, max ) => {
//   return Math.random() * (max - min) + min;
// }

const drawShape = (context, width, height) => {
  context.fillStyle = 'black';
  const w = percent(width, 1);
  const h = percent(height, 10);

  context.beginPath();
  context.rect(w * -0.5, random.range(0, h * -0.5), w, h);
  context.fill();
}

const distributeAroundCircle = (context, width, height, num, draw) => {
  const cx = percent(width, 50);
  const cy = percent(height, 50);
  
  let x, y;
  const radius = width * 0.3;

  const slice = math.degToRad(360 / num);
  for (let i = 0; i < num; i++) {
    const angle = slice * i;

    x = cx + radius * Math.sin(angle);
    y = cy + radius * Math.cos(angle);

    context.save();
    context.translate(x, y);
    context.rotate(-angle);
    context.scale(random.range(.1, 2), random.range(.2, .5));
    
    draw(context, width, height);
    
    context.restore();

    // context.fillStyle = 'black';
    context.save();
    context.translate(cx, cy);
    context.rotate(-angle);
    
    context.lineWidth = random.range(5, 20);
    context.beginPath();
    context.arc(0, 0, radius * random.range(.7, 1.3), slice * random.range(1,-8), slice * random.range(1, 5));
    context.stroke();
    context.restore();
  }
}

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    
    distributeAroundCircle(context, width, height, 40, drawShape);

  };
};

canvasSketch(sketch, settings);
