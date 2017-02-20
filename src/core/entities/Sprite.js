export default class Sprite {
  constructor(attributes) {
    let imgAsset = document.createElement('img'); // Not sure if better use "new Image();"
    imgAsset.src = attributes.src || '';

    this.image = attributes.src || '';;
    this.h_frames = attributes.h_frames || 1;
    this.v_frames = attributes.v_frames || 1;
    this.image_number = this.h_frames * this.v_frames;
    this.x_origin = this.x_origin || 0;
    this.y_origin = this.y_origin || 0;
    this.isReady = 0;
    this.hasError = 0;

    /* onLoad event */
    imgAsset.onload = image => {
      this.frame_width = imgAsset.width / this.h_frames;
      this.frame_height = imgAsset.height / this.v_frames;
      if (this.x_origin == 'center') {
        this.y_origin = this.frame_width / 2;
      }
      if (this.y_origin == 'center') {
        this.y_origin = this.frame_height / 2;
      }
      this.isReady = true;
    };

    /* onError event */
    imgAsset.onError = error => {
      console.info("Error loading game asset");
      this.hasError = 1;
    }

    console.info("[jGame] New sprite registered: ", this);
  }
}