const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 1080, 1080 ],
};

const percent = ( val, per ) => {
  return val * (per / 100);
}

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);
    context.strokeStyle = 'white';
    context.lineWidth = percent(width, 1);
    const w = percent(width, 10);
    const h = percent(height, 10);
    const gap = percent(width, 3);
    const ix = percent(width, 17);
    const iy = percent(width, 17);
    const off = percent(width, 2);
    let x, y;
    for( let i = 0; i < 5; i+=1)
    {
      for( let j = 0; j < 5; j+=1) {
        x = ix + (w + gap) * i;
        y = iy + (h + gap) * j;

        context.beginPath();
        context.rect(x, y, w, h);
        context.stroke();

        if (Math.random() > .5) {
          context.beginPath();
          context.rect(x + off / 2, y + off / 2, w - off, h - off);
          context.stroke();
        }
      }
    }
  };
};

canvasSketch(sketch, settings);
