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

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    


    context.fillStyle = 'black';
    
    
    const x = percent(width, 50);
    const y = percent(height, 50);
    const w = percent(width, 30);
    const h = percent(height, 30);

    
    context.translate(x, y);
    context.rotate(toRad(45));
    
    context.beginPath();
    context.rect(w * -0.5, h * -0.5, w, h);
    context.fill();
  };
};

canvasSketch(sketch, settings);
