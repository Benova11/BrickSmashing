import Paddle from './game-obj/paddle.js';
import InputHandler from './input.js';
import Ball from './game-obj/ball.js';
import { level1, level2, buildLevel } from './utils/levels.js';

const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3,
  NEWLEVEL: 4
};

export default class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;

    this.gamestate = GAMESTATE.MENU;

    this.paddle = new Paddle(this);
    this.ball = new Ball(this);
    this.bricks = [];
    this.gameObjects = [];
    this.lives = 3;

    this.levels = [level1, level2];
    this.currentLevel = 0;

    new InputHandler(this);
  }

  start() {
    if (
      this.gamestate !== GAMESTATE.MENU &&
      this.gamestate !== GAMESTATE.NEWLEVEL
    )
      return;

    this.bricks = buildLevel(this, this.levels[this.currentLevel]);
    this.gameObjects = [this.ball, this.paddle];
    this.ball.reset();

    this.gamestate = GAMESTATE.RUNNING;
  }

  update(deltaTime) {
    if (this.lives === 0) this.gamestate = GAMESTATE.GAMEOVER;
    if (this.bricks.length === 0 && this.gamestate === GAMESTATE.RUNNING) {
      this.currentLevel++;
      if (this.currentLevel > 0 && this.currentLevel === this.levels.length) {
        this.gamestate = GAMESTATE.MENU;
        this.currentLevel = 0;
        return;
      }
      this.gamestate = GAMESTATE.NEWLEVEL;
      this.start();
    }
    if (
      this.gamestate === GAMESTATE.PAUSED ||
      this.gamestate === GAMESTATE.MENU ||
      this.gamestate === GAMESTATE.GAMEOVER
    )
      return;

    this.bricks = this.bricks.filter(brick => !brick.markedForDeletion);

    [...this.gameObjects, ...this.bricks].forEach(gObject => {
      gObject.update(deltaTime);
    });
  }

  draw(ctx) {
    [...this.gameObjects, ...this.bricks].forEach(gObject => {
      gObject.draw(ctx);
    });

    if (this.gamestate === GAMESTATE.PAUSED) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = 'rgba(0,0,0,0.4)';
      ctx.fill();

      ctx.font = '30px Arial';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.fillText('Paused', this.gameWidth / 2, this.gameHeight / 2);
    }
    if (this.gamestate === GAMESTATE.MENU) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = 'rgba(0,0,0,1)';
      ctx.fill();

      ctx.font = '30px Arial';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.fillText(
        'Press SPACEBAR to start',
        this.gameWidth / 2,
        this.gameHeight / 2
      );
    }
    if (this.gamestate === GAMESTATE.GAMEOVER) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = 'rgba(0,0,0,1)';
      ctx.fill();

      ctx.font = '30px Arial';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.fillText('GAME OVER', this.gameWidth / 2, this.gameHeight / 2);
    }
  }

  togglePause() {
    if (this.gamestate == GAMESTATE.PAUSED) {
      this.gamestate = GAMESTATE.RUNNING;
    } else {
      this.gamestate = GAMESTATE.PAUSED;
    }
  }
}
