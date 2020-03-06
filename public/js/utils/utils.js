export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - Math.abs(min)) + Math.abs(min));
}

