import { detectCollision } from '/js/utils/collision.js';

export default class Brick {
  constructor(game, position) {
    this.game = game;

    this.width = 80;
    this.height = 24;

    this.img = document.getElementById('img_brick');

    this.position = position;

    this.markedForDeletion = false;
  }

  update(deltaTime) {
    if (detectCollision(this.game.ball, this)) {
      this.game.ball.speed.y = -this.game.ball.speed.y;

      this.markedForDeletion = true;
    }
  }

  draw(ctx) {
    ctx.drawImage(
      this.img,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}
