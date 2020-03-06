import Paddle from './paddle.js';
import InputHandler from './input.js';
import Ball from './ball.js';
import Brick from './brick.js';
import {level1,buildLevel} from './levels.js';

export default class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
  }

  start() {
    this.paddle = new Paddle(this);
    this.ball = new Ball(this);
    this.bricks =  buildLevel(this,level1);

    new Brick(this, { x: 20, y: 20 });

    new InputHandler(this.paddle);

    this.gameObjects = [this.ball, this.paddle, ...this.bricks];
  }

  update(deltaTime) {
    this.gameObjects.forEach(gObject => {
      gObject.update(deltaTime);
    });
  }

  draw(ctx) {
    this.gameObjects.forEach(gObject => {
      gObject.draw(ctx);
    });
  }
}
