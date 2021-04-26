import {
  SNAKE_SPEED,
  update as updateSnake,
  draw as drawSnake,
  getSnakeHead,
  snakeIntersected,
  getSnakeLength,
} from "./snake.js";
import { update as updateFood, draw as drawFood } from "./food.js";
import { isOutsideGrid } from "./grid.js";

let lastRenderTime = 0;
let score = 0;
const scoreText = document.querySelector("#score-text");
let gameOver = false;
const gameBoard = document.querySelector("#game-board");

function main(currentTime) {
  if (gameOver) {
    if (
      confirm("You lost with a score of " + score + ".  Press 'OK' to restart.")
    ) {
      window.location = "/"; // Refresh page;
    }
    return;
  }

  window.requestAnimationFrame(main);
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;

  lastRenderTime = currentTime;

  update();
  draw();
}

window.requestAnimationFrame(main);

function update() {
  updateSnake();
  updateFood();
  updateScore();
  checkDeath();
}

function draw() {
  gameBoard.innerHTML = "";
  drawSnake(gameBoard);
  drawFood(gameBoard);
}

function updateScore() {
  score = getSnakeLength() - 1;
  scoreText.innerHTML = score;
}

function checkDeath() {
  gameOver = isOutsideGrid(getSnakeHead()) || snakeIntersected();
}
