class Paddle {
  constructor(canvas, context, side = 'left') {
    this.canvas = canvas;
    this.canvasContext = context;
    this.side = side;
    this.height = 100;
    this.width = 5;
    this.yVelocity = 30;
    this.KEY_CODES =  {
      left: { 87: -this.yVelocity, 83: this.yVelocity },
      right: { 38: -this.yVelocity, 40: this.yVelocity },
    }

    const { width, height } = this.canvas;

    this.resetPosition();
    this.addEventListeners();
  }

  resetPosition() {
    const { width, height } = this.canvas;

    this.x = this.side === 'left'
      ? 10
      : width - (10 + this.width);

    this.y = (height - this.height)/2;
  }

  mouseMove(evt) {
    const rect = this.canvas.getBoundingClientRect();
    const root = document.documentElement;

    return { 
      x: evt.clientX - rect.left - root.scrollLeft, 
      y: evt.clientY - rect.top - root.scrollTop, 
    }
  }

  addEventListeners() {
    const { height } = this.canvas;

    //if (this.side === 'left') { return; }

    // this.canvas.addEventListener('mousemove', (evt) => {
    //   const { x, y } = this.mouseMove(evt);
    //   this.y = y - (this.height/2);

    //   if (this.y < 0) {
    //        this.y = 0;
    //   }

    //   if (this.y + this.height > height) {
    //     this.y = height - this.height;
    //   }
    // });

    document.addEventListener('keydown', (event) => {
      const codes = this.KEY_CODES[this.side];
      const e = codes[event.keyCode];

      if (e) {
        this.y += e;

        if (this.y < 0) {
          this.y = 0;
        }

        if (this.y + this.height > height) {
          this.y = height - this.height;
        }
      }
    });
  }

  draw() {
    const { width, height } = this.canvas;
    this.canvasContext.fillStyle = 'white';
    this.canvasContext.fillRect(this.x, this.y, this.width, this.height);
  }
}

export default Paddle;