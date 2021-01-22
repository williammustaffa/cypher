export class FpsManager {
  then: number = Date.now();
  startTime: number = this.then;
  frameCount: number = 0;
  shouldStop: boolean = false;
  fps: number;
  currentFps: number;
  loop: () => void;

  constructor(fps: number, loopFn: () => void) {
    this.fps = fps;
    this.loop = loopFn;
    this.currentFps = 0;
  }

  cycle = () => {
    if (this.shouldStop) return;

    requestAnimationFrame(this.cycle);

    const fps = 1000 / this.fps;
    const now = Date.now();
    const elapsed = now - this.then;

    if (elapsed > fps) {
      this.loop();
      this.then = now - (elapsed % fps);

      // fps info
      const sinceStart = now - this.startTime;
      this.currentFps = Math.round(1000 / (sinceStart / ++this.frameCount) * 100) / 100;
    }
  }

  stop() {
    this.shouldStop = true;
  }

  play() {
    this.cycle();
  }
}