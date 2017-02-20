/* Rooms */
export default class Scene {
  constructor(attributes) {
    this.instances = attributes.instances || [];
    this.viewports = attributes.viewports || [];
    this.height = attributes.height || 480;
    this.width = attributes.width || 640;

    console.info('[jGame] New scene created:', this);
  }
}
