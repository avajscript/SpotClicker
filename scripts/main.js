import { O } from "./osc.js";
import colors from "./colors.js";
import { Game } from "../classes/game.js";

const BLOCKS = 10,
  B_WIDTH = 50,
  B_HEIGHT = 50,
  OPACITY_DIF = 0.1,
  ANIMATION_DELAY = 100,
  LEVEL_INCREASE_TIMER = 10000;

let INCREASE_LEVEL_INTERVAL, MAKE_CIRCLE_INTERVAL;
let counter = 0;
/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const WIDTH = canvas.width,
  HEIGHT = canvas.height;

const game = new Game();

const gameCanvas = {
  renderMap: function () {
    for (let i = 0; i < BLOCKS; i++) {
      // draw horizontal line
      ctx.beginPath();
      ctx.moveTo(0, i * B_HEIGHT);
      ctx.lineTo(WIDTH, i * B_HEIGHT);
      ctx.stroke();

      // draw vertical line
      ctx.beginPath();
      ctx.moveTo(i * B_WIDTH, 0);
      ctx.lineTo(i * B_WIDTH, HEIGHT);
      ctx.stroke();
    }
  },

  clearMap: function () {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
  },

  drawCircle: function (x, y, opacity) {
    // clear rect section and draw circle
    ctx.clearRect(x, y, x + B_WIDTH, y + B_WIDTH);
    ctx.fillStyle = "#ffdf00";
    ctx.fillRect(x + 1, y + 1, x + B_WIDTH - 2, y + B_HEIGHT - 2);

    ctx.beginPath();
    ctx.fillStyle = `rgba(255, 0, 0, ${opacity})`;
    ctx.arc(x + B_WIDTH / 2, y + B_HEIGHT / 2, B_WIDTH / 2, 0, 2 * Math.PI);
    ctx.fill();

    // increase or degrees opacity based on conditions
    opacity += OPACITY_DIF;
    if (opacity > 1) return;
    setTimeout(() => {
      this.drawCircle(x, y, opacity);
    }, ANIMATION_DELAY);
  },

  makeCircle: function () {
    let x = Math.floor(Math.random() * BLOCKS);
    let y = Math.floor(Math.random() * BLOCKS);

    this.drawCircle(0, 0, 0);
    setTimeout(() => {
      this.hideCircle(0, 0, 1);
    }, 1000);
  },

  hideCircle(x, y, opacity) {
    // clear rect section and draw circle

    ctx.clearRect(x, y, x + B_WIDTH, y + B_WIDTH);
    ctx.fillStyle = "#ffdf00";
    ctx.fillRect(x + 1, y + 1, x + B_WIDTH - 2, y + B_HEIGHT - 2);

    ctx.beginPath();
    ctx.fillStyle = `rgba(255, 0, 0, ${opacity})`;
    ctx.arc(x + B_WIDTH / 2, y + B_HEIGHT / 2, B_WIDTH / 2, 0, 2 * Math.PI);
    ctx.fill();

    // increase or degrees opacity based on conditions
    opacity -= OPACITY_DIF;
    if (opacity < 0) return;
    setTimeout(() => {
      this.hideCircle(x, y, opacity);
    }, ANIMATION_DELAY);
  },
  startLoop: function () {
    // increase game level every level increase timer (10000)
    INCREASE_LEVEL_INTERVAL = setInterval(
      game.increaseLevel,
      LEVEL_INCREASE_TIMER
    );

    // create a circle every game spawn time (starts at 5000)
    // also makes them functional
    MAKE_CIRCLE_INTERVAL = setInterval(this.makeCircle, game.getSpawnTime());
  },
};

gameCanvas.renderMap();

gameCanvas.drawCircle(0, 0, 0);
setTimeout(() => {
  gameCanvas.hideCircle(0, 0, 1);
}, 1000);

/* setTimeout(()=> {
  drawInterval = setInterval(() => {
    gameCanvas.drawCircle(0, 0, 0, false);
    if (++counter == 10) {
      clearInterval(drawInterval);
    }
  }, ANIMATION_DELAY);
}, 10 * ANIMATION_DELAY); */

const startGame = () => {
  gameCanvas.startLoop();
};

startGame();
