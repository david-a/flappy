class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.velY = 0;
    this.velX = panSpeed;
    this.radius = 25;
  }

  show() {
    noStroke();
    fill(255, 255, 0);
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
