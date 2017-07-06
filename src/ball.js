class Ball {
  constructor(canvas, context) {
    this.canvas = canvas;
    this.canvasContext = context;

    const { width, height } = this.canvas;

    // Set init position
    this.radius = 5;
    this.resetPosition();
  }

  resetPosition() {
    const { width, height } = this.canvas;

    const randomize = (min, max) => {
      const genInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
      const direction = genInRange(0, 1);
      const val = genInRange(min, max);

      return direction 
        ? -val
        : val;
    };

    this.x = (width - this.radius)/2;
    this.y = (height - this.radius)/2;
    this.xVelocity = randomize(8, 11);
    this.yVelocity = randomize(1, 10);
  }

  draw() {
    const { width, height } = this.canvas;
    this.canvasContext.fillStyle = 'white';
    this.canvasContext.beginPath();
    this.canvasContext.arc(this.x, this.y, this.radius, 0, Math.PI*2);
    this.canvasContext.fill();

    if (this.y >= (height - (this.radius*2)) || this.y <= 0) {
      this.yVelocity *= -1;
    }

    this.x += this.xVelocity;
    this.y += this.yVelocity;
  }
}

export default Ball;