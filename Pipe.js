class Pipe {
  constructor(height, width, isTop = false) {
    this.width = width;
    this.height = height || floor(random(canvas.height - 100));
    this.x = canvas.width + this.width;
    this.isTop = isTop;

    if (isTop) {
      this.topY = 0;
      this.bottomY = this.height;
    } else {
      this.topY = canvas.height - this.height;
      this.bottomY = canvas.height;
    }
  }

  show() {
    push();
    noStroke();
    fill(0, 204, 0);
    rect(this.x, this.topY, this.width, this.height);
    pop();
  }

  update() {
    this.x -= panSpeed;
  }

  colided(plyr) {
    if (
      plyr.x + plyr.radiusX > this.x &&
      plyr.x - plyr.radiusX < this.x + this.width
    ) {
      if (!this.isTop && plyr.y + plyr.radiusY >= this.topY) {
        return true;
      }
      if (this.isTop && plyr.y - plyr.radiusY <= this.bottomY) {
        return true;
      }
    }
    return false;
  }
}
