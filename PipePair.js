class PipePair {
  constructor(gap, pipeWidth) {
    this.gap = gap;
    this.pipeWidth = pipeWidth;
    this.topHeight = floor(random(20, canvas.height - 100 - this.gap));
    this.bottomHeight = canvas.height - this.topHeight - this.gap;

    this.bottomPipe = new Pipe(this.bottomHeight, pipeWidth);
    this.topPipe = new Pipe(this.topHeight, pipeWidth, true);
  }

  show() {
    this.bottomPipe.show();
    this.topPipe.show();
  }

  update() {
    this.bottomPipe.update();
    this.topPipe.update();
  }

  offScreen() {
    if (this.bottomPipe.x + this.bottomPipe.width < 0) {
      return true;
    }
  }
}
