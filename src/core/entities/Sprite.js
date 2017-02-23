import { CONSTANTS } from "../utils";

export default class Sprite {
  constructor(attributes) {
    this.img = document.createElement('img'); // Not sure if better use "new Image();"
    this.img.src = attributes.src || '';

    this.h_frames = attributes.h_frames || 1;
    this.v_frames = attributes.v_frames || 1;
    this.image_number = this.h_frames * this.v_frames;
    this.x_origin = attributes.x_origin || 0;
    this.y_origin = attributes.y_origin || 0;
    this.offset_left = attributes.offset_left || 0;
    this.offset_right = attributes.offset_right || 0;
    this.offset_top = attributes.offset_top || 0;
    this.offset_bottom = attributes.offset_bottom || 0;
    this.isReady = false;
    this.hasError = false;

    /* onLoad event */
    this.img.onload = image => {
      this.frame_width = this.img.width / this.h_frames;
      this.frame_height = this.img.height / this.v_frames;
      if (this.x_origin == CONSTANTS.center) {
        this.x_origin = this.frame_width / 2;
      }
      if (this.y_origin == CONSTANTS.center) {
        this.y_origin = this.frame_height / 2;
      }
      this.isReady = true;
    };

    /* onError event */
    this.img.onError = error => {
      console.info("Error loading game asset");
      this.hasError = true;
    }

    console.info("[jGame] New sprite registered: ", this);
  }
}