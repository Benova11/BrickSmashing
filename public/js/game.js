import Paddle from './game-obj/paddle.js';
import InputHandler from './input.js';
import Ball from './game-obj/ball.js';
import Brick from './game-obj/brick.js';
import { level1, buildLevel } from './utils/levels.js';

export default class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
  }

  start() {
    this.paddle = new Paddle(this);
    this.ball = new Ball(this);
    this.bricks = buildLevel(this, level1);

    new Brick(this, { x: 20, y: 20 });

    new InputHandler(this.paddle);

    this.gameObjects = [this.ball, this.paddle, ...this.bricks];
  }

  update(deltaTime) {
    this.gameObjects.forEach(gObject => {
      gObject.update(deltaTime);
    });

    this.gameObjects = this.gameObjects.filter(object => !object.markedForDeletion);
  }

  draw(ctx) {
    this.gameObjects.forEach(gObject => {
      gObject.draw(ctx);
    });
  }
}
