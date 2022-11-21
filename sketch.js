const panSpeed = 5;
const gravity = 2;
const pipeWidth = 100;
const verticalGap = 200;
const horizontalGap = 400;
const canvasWidth = 500;
const canvasHeight = 700;

let player;
let score;
let pipePairs;
let failed;

const maxPipes = (3 * canvasWidth) / (pipeWidth + horizontalGap);
console.log("maxPipes", maxPipes);
function currentPipePair() {
  return pipePairs[pipeIndex];
}

function addPipePair() {
  pipePairs.unshift(new PipePair(verticalGap, pipeWidth));
  if (pipePairs.length > maxPipes) {
    pipePairs.pop();
  }
}

function fail() {
  failed = true;
  noLoop();
}

function unfail() {
  failed = false;
  loop();
}

function reset() {
  player = new Player(100, canvasHeight / 2);
  score = new Score();
  pipePairs = [];
  addPipePair();
  unfail();
}

function setup() {
  window.canvas = createCanvas(canvasWidth, canvasHeight);
  frameRate(30);
  reset();
}

function draw() {
  background(135, 206, 250);
  if (pipePairs[0].bottomPipe.x < canvasWidth / 2) {
    addPipePair();
  }
  player.update();
  pipePairs.forEach((pipePair) => {
    pipePair.update();
    pipePair.show();
    if (pipePair.colided(player) || player.colidedEarth()) {
      fail();
    } else if (pipePair.justPassed(player)) {
      score.scoreUp();
    }
  });
  player.show();
  score.show();
}

function keyPressed() {
  switch (key) {
    case " ":
      player.flap();
      break;
    case "r":
    case "R":
      reset();
      break;
  }
}