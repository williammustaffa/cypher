export default class FpsManager {
  /**
   * indicates last loop
   */
  then = Date.now();

  /**
   * indicates last loop
   */
  start_time = this.then;

  /**
   * indicates frames since start
   */
  frameCount = 0;

  /**
   * stop state
   */
  stop = false;

  /**
   * constructor
   * @param {object} options
   */
  constructor(fps = 60, loopFn) {
    this.fps = fps;
    this.loop = loopFn;
    this.current_fps = 0;
  }

  inner_loop = () => {
    if (this.stop) return;

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
    this.stop = true;
  }

  play() {
    this.inner_loop();
  }
}