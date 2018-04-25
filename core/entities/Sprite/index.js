import Constants from "utils/Constants";
import uuid from 'uuid';

export default class Sprite {
  /**
   * Define class group
   */
  group_identifier = Constants.SPRITE;

  constructor(attributes = {}) {
    this.id = uuid.v4();
    this.name = this.constructor.name;
    this.h_frames = attributes.h_frames || 1;
    this.v_frames = attributes.v_frames || 1;
    this.x_origin = attributes.x_origin || 0;
    this.y_origin = attributes.y_origin || 0;
    this.offset_left = attributes.offset_left || 0;
    this.offset_right = attributes.offset_right || 0;
    this.offset_top = attributes.offset_top || 0;
    this.offset_bottom = attributes.offset_bottom || 0;
    this.isReady = false;
    this.hasError = false;
    this.frame_height = 0;
    this.frame_width = 0;
    this.x_origin = 0;
    this.y_origin = 0;
    console.info("[jGame] New sprite registered: ", this);
  }

  get image_number() {
    return this.h_frames * this.v_frames;
  }

  load() {
    this.img = document.createElement('img');
    this.img.src = this.src;
    /* onLoad event */
    this.img.onload = image => {
      this.frame_width = this.img.width / this.h_frames;
      this.frame_height = this.img.height / this.v_frames;
      if (this.x_origin == Constants.CENTER) {
        this.x_origin = this.frame_width / 2;
      }
      if (this.y_origin == Constants.CENTER) {
        this.y_origin = this.frame_height / 2;
      }
      this.isReady = true;
    };

    /* onError event */
    this.img.onError = error => {
      console.info("Error loading game asset");
      this.hasError = true;
    }
  }
}