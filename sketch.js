const panSpeed = 4;
const gravity = 2;
const pipeWidth = 100;
const verticalGap = 200;
const horizontalGap = 400;
const canvasWidth = 500;
const canvasHeight = 700;

let player;
let score;
let pipePairs;
let state = "pending"; // 'pending' | 'play' | 'failed'
let starting;

let birdSprite;
const birdSpriteRadiusX = 26;
const birdSpriteRadiusY = 18;

const maxPipes = (3 * canvasWidth) / (pipeWidth + horizontalGap);
function currentPipePair() {
  return pipePairs[pipeIndex];
}

function addPipePair() {
  pipePairs.unshift(new PipePair(verticalGap, pipeWidth));
  if (pipePairs.length > maxPipes) {
    pipePairs.pop();
  }
}

function reset() {
  player = new Player(
    100,
    canvasHeight / 2,
    birdSpriteRadiusX,
    birdSpriteRadiusY,
    birdSprite
  );
  score = new Score();
  pipePairs = [];
  addPipePair();
  state = "pending";
  draw();
  noLoop();
}

function preload() {
  birdSprite = loadImage("./assets/images/bird.png");
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
      state = "failed";
      noLoop();
    } else if (pipePair.justPassed(player)) {
      score.scoreUp();
    }
  });
  player.show(state);
  score.show();
}

function keyPressed() {
  switch (key) {
    case " ":
      if (state === "failed") {
        reset();
      } else {
        if (state === "pending") {
          state = "play";
          player.show(state);
          loop();
        }
        player.flap();
      }
      break;
    case "r":
    case "R":
      reset();
      break;
  }
}
