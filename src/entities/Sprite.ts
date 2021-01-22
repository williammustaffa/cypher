import uuid from 'uuid';
import { EntityTypes, AlignmentTypes } from '@src/constants';
import { MediaAsset } from '@src/lib';

export abstract class Sprite extends MediaAsset {
  id: string;
  horizontalFrames: number = 1;
  verticalFrames: number = 1;
  xOrigin: number | AlignmentTypes;
  yOrigin: number | AlignmentTypes;
  offsetLeft: number = 0;
  offsetRight: number = 0;
  offsetTop: number = 0;
  offsetBottom: number = 0;
  frameWidth: number = 0;
  frameHeight: number = 0;
  DOMElement: HTMLImageElement;

  groupIdentifier: EntityTypes = EntityTypes.SPRITE;

  constructor() {
    super();
    this.id = uuid.v4();
    console.info('[Cypher] New sprite registered: ', this);
  }

  get imageNumber() {
    return this.horizontalFrames * this.verticalFrames;
  }

  onSuccess(DOMElement: HTMLImageElement) {
    /* onLoad event */
    this.frameWidth = DOMElement.width / this.horizontalFrames;
    this.frameHeight = DOMElement.height / this.verticalFrames;

    if (this.xOrigin === AlignmentTypes.CENTER) {
      this.xOrigin = this.frameWidth / 2;
    }

    if (this.yOrigin === AlignmentTypes.CENTER) {
      this.yOrigin = this.frameHeight / 2;
    }
  }

  onFailure(errorMessage: string) {
    console.log(errorMessage)
  }
}