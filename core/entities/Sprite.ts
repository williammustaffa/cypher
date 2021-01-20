import uuid from 'uuid';
import { EntityTypes, AlignmentTypes } from '@core/constants';
import { MediaAsset } from '@core/lib';

export class Sprite extends MediaAsset {
  id: string;
  h_frames: number = 1;
  v_frames: number = 1;
  x_origin: number | AlignmentTypes = 0;
  y_origin: number | AlignmentTypes = 0;
  offset_left: number = 0;
  offset_right: number = 0;
  offset_top: number = 0;
  offset_bottom: number = 0;
  frame_width: number = 0;
  frame_height: number = 0;

  group_identifier: EntityTypes = EntityTypes.SPRITE;

  constructor() {
    super();
    this.id = uuid.v4();
    console.info('[Cypher] New sprite registered: ', this);
  }

  get image_number() {
    return this.h_frames * this.v_frames;
  }

  done = (image_dom: HTMLImageElement) => {

    /* onLoad event */
    this.frame_width = image_dom.width / this.h_frames;
    this.frame_height = image_dom.height / this.v_frames;

    if (this.x_origin === AlignmentTypes.CENTER) {
      this.x_origin = this.frame_width / 2;
    }

    if (this.y_origin === AlignmentTypes.CENTER) {
      this.y_origin = this.frame_height / 2;
    }
  }
}