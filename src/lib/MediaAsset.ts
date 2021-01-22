import { EntityTypes } from '@src/constants';

export abstract class MediaAsset {
  isReady: boolean = false;
  hasError: boolean = false;
  source: string;
  DOMElement: HTMLElement | HTMLImageElement | HTMLSourceElement;

  protected abstract onSuccess(DOMElement: HTMLImageElement): void;
  protected abstract onFailure(errorMessage: string): void;
  protected abstract groupIdentifier: EntityTypes;

  load() {
    switch (this.groupIdentifier) {
      case EntityTypes.SPRITE:
        this.loadImage()
        break;
      case EntityTypes.BACKGROUND:
        this.loadBackground()
        break;
      case EntityTypes.SOUND:
        this.loadSound()
        break;
      default:
        this.onFailure('Asset group identifier was not defined');
    }
  }

  loadImage() {
    const DOMImage: HTMLImageElement = document.createElement('img');

    DOMImage.src = this.source;

    /* onLoad event */
    DOMImage.onload = () => {
      this.isReady = true;
      this.onSuccess(DOMImage);
    };

    /* onError event */
    DOMImage.onerror = () => {
      this.hasError = true;
      this.onFailure('Error loading asset');
    }

    this.DOMElement = DOMImage;
  }

  /**
   * loads an background
   */
  loadBackground() {

  }

  /**
   * loads sound
   */
  loadSound() {

  }
}