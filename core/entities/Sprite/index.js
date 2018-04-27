import MediaAsset from 'utils/MediaAsset';
import Constants from 'utils/Constants';
import uuid from 'uuid';

export default class Sprite extends MediaAsset {
  /**
   * Define class group
   */
  group_identifier = Constants.SPRITE;

  /**
   * number of horizontal frames
   */
  h_frames = 1;

  /**
   * number of vertical frames
   */
  v_frames = 1;

  /**
   * drawing point in x position from image frame
   */
  x_origin = 0;

  /**
   * drawing point in y position from image frame
   */
  y_origin = 0;

  /**
   * offset from frame left side
   */
  offset_left = 0;

  /**
   * offset from frame right side
   */
  offset_right = 0;

  /**
   * offset from frame top
   */
  offset_top = 0;

  /**
   * offset from frame bottom
   */
  offset_bottom = 0;

  /**
   * initial frame width
   */
  frame_width = 0;

  /**
   * initial frame height
   */
  frame_height = 0;

  constructor() {
    super();
    this.id = uuid.v4();
    this.name = this.constructor.name;

    this.done = image_dom => {

      /* onLoad event */
      this.frame_width = image_dom.width / this.h_frames;
      this.frame_height = image_dom.height / this.v_frames;

      if (this.x_origin == Constants.CENTER) {
        this.x_origin = this.frame_width / 2;
      }

      if (this.y_origin == Constants.CENTER) {
        this.y_origin = this.frame_height / 2;
      }
    }
    console.info('[jGame] New sprite registered: ', this);
  }

  get image_number() {
    return this.h_frames * this.v_frames;
  }
}