class Score {
  constructor() {
    this.x = 30;
    this.y = 30;
    this.size = 32;
    this.score = 0;
    this.color = [255, 255, 0];
  }

  show() {
    textSize(this.size);
    fill(this.color);
    text(this.score, this.x, this.y);
  }

  scoreUp() {
    this.score++;
  }
}
