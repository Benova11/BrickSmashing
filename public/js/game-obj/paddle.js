export default class Paddle {
  constructor(game) {
    this.gameWidth = game.gameWidth;

    this.width = 150;
    this.height = 20;

    this.position = {
      x: this.gameWidth / 2 - this.width / 2,
      y: game.gameHeight - this.height - 10
    };

    this.maxSpeed = 7;
    this.speed = 0;
  }

  moveLeft() {
    this.speed = -this.maxSpeed;
  }

  moveRight() {
    this.speed = this.maxSpeed;
  }

  stop() {
    this.speed = 0;
  }
  update(deltaTime) {
    this.position.x += this.speed;
    if (this.position.x < 0) {
      stop();
      this.position.x = 0;
    } else if (this.position.x + this.width > this.gameWidth) {
      stop();
      this.position.x = this.gameWidth - this.width;
    }
  }
  draw(ctx) {
    ctx.fillStyle = '#0ff';
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}
