class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.velY = 0;
    this.velX = panSpeed;
    this.radius = 25;
    this.colors = {
      play: [255, 255, 0],
      failed: [255, 0, 0],
      pending: [255, 165, 0],
    };
  }

  show(state = "play") {
    noStroke();
    fill(this.colors[state]);
    ellipse(this.x, this.y, this.radius * 2);
  }

  update() {
    this.velY += gravity;
    this.velY = constrain(this.velY, -25, 25);
    this.y += this.velY;
    // this.x += this.velX;
  }

  flap() {
    this.velY -= 25;
  }

  colidedEarth() {
    return this.y + this.radius >= canvasHeight;
  }
}
