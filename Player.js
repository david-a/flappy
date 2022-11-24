class Player {
  constructor(x, y, radiusX = 25, radiusY = 25, sprite = null) {
    this.sprite = sprite;
    this.x = x;
    this.y = y;
    this.velY = 0;
    this.velX = panSpeed;
    this.minVelY = -25;
    this.maxVelY = 25;
    this.radiusX = radiusX;
    this.radiusY = radiusY;
    this.score = 0;

    this.colors = {
      play: [255, 255, 0],
      failed: [255, 0, 0],
      pending: [255, 165, 0],
    };
  }

  show(state = "play") {
    push();
    if (this.sprite) {
      translate(this.x, this.y);
      imageMode(CENTER);
      if (this.velY < 0) {
        rotate(-PI / 6);
      } else if (this.velY < 10) {
        rotate(-PI / 10);
      } else if (this.velY > 20) {
        rotate(PI / 3);
      } else if (this.velY > 10) {
        rotate(PI / 10);
      }
      image(this.sprite, 0, 0, this.radiusX * 2, this.radiusY * 2);
    } else {
      noStroke();
      fill(this.colors[state]);
      ellipse(this.x, this.y, this.radiusX * 2, this.radiusY * 2);
    }
    pop();
  }

  update() {
    this.velY += gravity;
    this.velY = constrain(this.velY, this.minVelY, this.maxVelY);
    this.y += this.velY;
    // this.x += this.velX;
  }

  flap() {
    this.velY -= 25;
  }

  colidedEarth() {
    return this.y + this.radiusY >= canvasHeight;
  }

  colidedPipePair(pipePair) {
    return pipePair.bottomPipe.colided(this) || pipePair.topPipe.colided(this);
  }

  justPassedPipePair(pipePair) {
    const backOfPlayer = this.x - this.radiusX;
    const normalizedBackOfPlayer = backOfPlayer - (backOfPlayer % panSpeed);

    return (
      normalizedBackOfPlayer ===
      pipePair.bottomPipe.x + pipePair.bottomPipe.width + panSpeed
    );
  }

  incrementScore() {
    this.score++;
  }

  resetScore() {
    this.score = 0;
  }
}
