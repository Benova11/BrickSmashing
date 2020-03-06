export default class Brick {
  constructor(game, position) {
    this.game = game;

    this.width = 80;
    this.height = 24;

    this.img = document.getElementById('img_brick');

    this.position = position;
  }

  update(deltaTime) {

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
