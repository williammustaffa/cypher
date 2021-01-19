import { ENTITY_TYPES, ALIGNMENT } from '@core/constants';
import { MediaAsset } from '@core/lib';
import uuid from 'uuid';

export class Sprite extends MediaAsset {
  group_identifier = ENTITY_TYPES.SPRITE;
  h_frames = 1;
  v_frames = 1;
  x_origin = 0;
  y_origin = 0;
  offset_left = 0;
  offset_right = 0;
  offset_top = 0;
  offset_bottom = 0;
  frame_width = 0;
  frame_height = 0;

  constructor() {
    super();
    this.id = uuid.v4();
    this.name = this.constructor.name;

    this.done = image_dom => {

      /* onLoad event */
      this.frame_width = image_dom.width / this.h_frames;
      this.frame_height = image_dom.height / this.v_frames;

      if (this.x_origin == ALIGNMENT.CENTER) {
        this.x_origin = this.frame_width / 2;
      }

      if (this.y_origin == ALIGNMENT.CENTER) {
        this.y_origin = this.frame_height / 2;
      }
    }
    console.info('[Cypher] New sprite registered: ', this);
  }

  get image_number() {
    return this.h_frames * this.v_frames;
  }
}