export class FpsManager {
  then: number = Date.now();
  start_time: number = this.then;
  frameCount: number = 0;
  should_stop: boolean = false;
  fps: number;
  current_fps: number;
  loop: () => void;

  constructor(fps: number, loopFn: () => void) {
    this.fps = fps;
    this.loop = loopFn;
    this.current_fps = 0;
  }

  inner_loop = () => {
    if (this.should_stop) return;

    requestAnimationFrame(this.inner_loop);

    const fps = 1000 / this.fps;
    const now = Date.now();
    const elapsed = now - this.then;

    if (elapsed > fps) {
      this.loop();
      this.then = now - (elapsed % fps);

      // fps info
      const sinceStart = now - this.start_time;
      this.current_fps = Math.round(1000 / (sinceStart / ++this.frameCount) * 100) / 100;
    }
  }

  stop() {
    this.should_stop = true;
  }

  play() {
    this.inner_loop();
  }
}