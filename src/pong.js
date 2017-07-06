import Ball from './ball';
import Paddle from './paddle';

class Pong {
  constructor(canvas, context) {
    this.canvas = canvas;
    this.canvasContext = context;
    this.fps = 30;

    const { width, height } = this.canvas;
    this.balls = [
      new Ball(canvas, context),
    ];

    this.paddles = [
      new Paddle(canvas, context),
      new Paddle(canvas, context, 'right'),
    ];

    setInterval(() => {         
      this.collisions();
      this.draw();

    }, 1000/this.fps);
  }

  collisions() {
    const { width, height } = this.canvas;

    this.balls.forEach(ball => {
      const ballRight = ball.x + ball.radius;
      this.paddles.forEach(paddle => {
        let hit =  (paddle.side === 'left') 
          ? (ball.x <= paddle.x + paddle.width)
          : ball.x + ball.radius >= paddle.x;

        if (hit && (ball.y >= paddle.y && ball.y <= paddle.y + paddle.height)) {
          ball.xVelocity *= -1;
        }
      });

      if (ball.x <= 0) {
        this.score(ball);
      }

      if (ballRight >= width) {
        this.score(ball);
      }
    });
  }

  draw() {
    const { width, height } = this.canvas;
    this.canvasContext.fillStyle = 'black';
    this.canvasContext.fillRect(0, 0, width, height);

    this.balls.forEach(_e => _e.draw());
    this.paddles.forEach(_e => _e.draw());
  }

  score(ball) {
    ball.resetPosition();
  }
}

export default Pong;