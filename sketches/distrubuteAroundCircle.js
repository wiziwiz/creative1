const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 1080, 1080 ]
};

const percent = ( val, per ) => {
  return val * (per / 100);
}

const toRad = (angle) => {
  return angle / 180 * Math.PI;
}

const drawShape = (context, width, height) => {
  context.fillStyle = 'black';
  const w = percent(width, 1);
  const h = percent(height, 10);

  context.beginPath();
  context.rect(w * -0.5, h * -0.5, w, h);
  context.fill();
}

const distributeAroundCircle = (context, width, height, num, draw) => {
  const cx = percent(width, 50);
  const cy = percent(height, 50);
  
  let x, y;
  const radius = width * 0.3;

  const slice = toRad(360 / num);
  for (let i = 0; i < num; i++) {
    const angle = slice * i;

    x = cx + radius * Math.sin(angle);
    y = cy + radius * Math.cos(angle);

    context.save();
    context.translate(x, y);
    context.rotate(-angle);
    
    draw(context, width, height);
    
    context.restore();
    
  }
}

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    
    distributeAroundCircle(context, width, height, 12, drawShape);

  };
};

canvasSketch(sketch, settings);
