const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');


const settings = {
  dimensions: [ 2048, 2048 ],
	animate: true,
  fps: 10,
};

let manager;
let x, y;
let canvas;
const bubbles = [];
let bubbleI = 0;

const sketch = () => {
  return ({ context, width, height }) => {

    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);
    done = false;
    
    if (x !== undefined) {
      context.fillStyle = 'white';
    
      // console.log("yahoo: ", x, y, bubbleI);
      bubbles[bubbleI%20] = new Bubble(x, y, width, height);;

      
      bubbles.forEach(agent => {
        // console.log("ca bubule!: ", bubbleI%40);
        agent.update();
        agent.draw(context);
      });
      bubbleI+=1;
    }

  };
};

class Vector {
	constructor(x, y, radAndLine, width, height) {
    if (x < radAndLine) {
      x = radAndLine;
    }
    if (x + radAndLine > width) {
      x = width - radAndLine;
    }
		this.x = x;

    if (y < radAndLine) {
      y = radAndLine;
    }
    if (y + radAndLine > height) {
      y = height - radAndLine;
    }
		this.y = y;
	}
}

class Bubble {
  constructor(x, y, width, height) {
		this.vel = new Vector(random.range(-5, 5), random.range(-5, 5));
		this.radius = random.range(15, 100);
    this.lineWidth = 4;
    this.pos = new Vector(x, y, this.lineWidth + this.radius, width, height);
	}

	update() {
		this.pos.x += this.vel.x;
		this.pos.y += this.vel.y;
    // console.log("ca update!: ", this.pos.x);
	}

	draw(context) {
		context.save();
		context.translate(this.pos.x, this.pos.y);

		context.lineWidth = this.lineWidth;

		context.beginPath();
		context.arc(0, 0, this.radius, 0, Math.PI * 2);
		context.fill();
		context.stroke();

		context.restore();
    // console.log("ca draw : ", this.pos.x, this.pos.y, this.lineWidth, this.radius );
	}
};

const mouseMove = (e) => {
  // console.log(e);
  const elementRelativeX = e.offsetX;
  const elementRelativeY = e.offsetY;
  x = elementRelativeX * canvas.width / canvas.clientWidth;
  y = elementRelativeY * canvas.height / canvas.clientHeight;

  manager.render();
}


const start = async () => {
  manager = await canvasSketch(sketch, settings);
  canvas = document.querySelector('canvas');
  // const rect = canvas.getBoundingClientRect();
  canvas.addEventListener('mousemove', mouseMove);
};

start();

