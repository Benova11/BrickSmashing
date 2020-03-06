import { detectCollision } from '/js/utils/collision.js';

export default class Ball {
  constructor(game) {
    this.game = game;

    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;

    this.img = document.getElementById('img_ball');

    this.maxSpeed = {
      x: 2,
      y: 2
    };

    this.size = 16;

    this.reset();
  }

  reset() {
    this.position = {
      x: 10,
      y: 400
    };

    this.speed = {
      x: 3,
      y: -2
    };
  }

  update(deltaTime) {
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;

    if (this.position.x + this.size > this.gameWidth || this.position.x < 0) {
      this.speed.x = -this.speed.x;
    }
    //top border
    if (this.position.y < 0) {
      this.speed.y = -this.speed.y;
    }
    //bottom border
    if (this.position.y + this.size > this.gameHeight) {
      this.reset();
      this.game.lives--;
    }

    if (detectCollision(this, this.game.paddle)) {
      this.speed.y = -this.speed.y;
      this.position.y = this.game.paddle.position.y - this.size;
    }
  }

  draw(ctx) {
    ctx.drawImage(
      this.img,
      this.position.x,
      this.position.y,
      this.size,
      this.size
    );
  }
}
