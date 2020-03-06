import Brick from '../game-obj/brick.js';

export function buildLevel(game, level) {
  let bricks = [];

  level.forEach((row, rowIndex) => {
    row.forEach((brick, colIndex) => {
      if (brick) {
        let position = {
          x: colIndex * 80,
          y: 75 + rowIndex * 24
        };
        bricks.push(new Brick(game, position));
      } else {
      }
    });
  });
  return bricks;
}

export const level1 = [
  [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];
