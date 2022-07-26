const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');

const settings = {
	dimensions: [ 1080, 1080 ],
	animate: true
};

// this is how you would animate something without canvas-sketch
const animate = () => {
	console.log('domestika');
	requestAnimationFrame(animate);
};
// animate();

const sketch = ({ context, width, height }) => {
	const agents = [];

	for (let i = 0; i < 40; i++) {
		const x = random.range(0, width);
		const y = random.range(0, height);

		agents.push(new Agent(x, y, width, height));
	}

	return ({ context, width, height }) => {
		context.fillStyle = 'white';
		context.fillRect(0, 0, width, height);

    //drawing the lines
		for (let i = 0; i < agents.length; i++) {
			const agent = agents[i];

			for (let j = i + 1; j < agents.length; j++) {
				const other = agents[j];

				const dist = agent.pos.getDistance(other.pos);

				if (dist > 200) continue;
        // the farer, the lighter is the line
				context.lineWidth = math.mapRange(dist, 0, 200, 12, 1);

				context.beginPath();
				context.moveTo(agent.pos.x, agent.pos.y);
				context.lineTo(other.pos.x, other.pos.y);
				context.stroke();
			}
		}

		agents.forEach(agent => {
			agent.update();
			agent.draw(context);
			agent.bounce(width, height);
		});
	};
};

canvasSketch(sketch, settings);

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

	getDistance(v) {
		const dx = this.x - v.x;
		const dy = this.y - v.y;
		return Math.sqrt(dx * dx + dy * dy);
	}
}

class Agent {
	constructor(x, y, width, height) {
		this.vel = new Vector(random.range(-1, 1), random.range(-1, 1));
		this.radius = random.range(4, 12);
    this.lineWidth = 4;
    this.pos = new Vector(x, y, this.lineWidth + this.radius, width, height);
    // /2 to have it look like it hits the borders.
    this.radAndLine = this.lineWidth/2 + this.radius;
	}

	bounce(width, height) {
		if (this.pos.x - this.radAndLine <= 0 || this.pos.x + this.radAndLine >= width)  this.vel.x *= -1;
		if (this.pos.y - this.radAndLine <= 0 || this.pos.y + this.radAndLine >= height) this.vel.y *= -1;
	}

	update() {
		this.pos.x += this.vel.x;
		this.pos.y += this.vel.y;
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
	}
}