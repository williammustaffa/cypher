import { EntityTypes } from '@core/constants';

export class MediaAsset {
  /**
   * indicates whether the asset is loaded or not
   */
  is_ready = false;

  /**
   * indicates whether the asset is loaded or not
   */
  has_error = false;

  /**
   * indicates the asset type
   */
  group_identifier = undefined;

  /**
   * identify the asset type and call loader method
   */
  load() {
    if (!this.group_identifier) return false;

    // loads image
    if (this.group_identifier === EntityTypes.SPRITE) {
      return this.load_image();
    }

    // loads background
    if (this.group_identifier === EntityTypes.BACKGROUND) {
      return this.load_background();
    }

    // loads sound
    if (this.group_identifier === EntityTypes.SOUND) {
      return this.load_sound();
    }
  }

  /**
   * loads an image
   */
  load_image() {
    const img_dom = document.createElement('img');

    img_dom.src = this.src;

    /* onLoad event */
    img_dom.onload = () => {
      this.is_ready = true;
      if (typeof this.done === 'function') this.done(img_dom);
    };

    /* onError event */
    img_dom.onError = () => {
      console.info('Error loading game asset');
      if (typeof this.fail === 'function') this.fail('Error loading asset');
      this.has_error = true;
    }

    this.img = img_dom;
  }

  /**
   * loads an background
   */
  load_background() {

  }

  /**
   * loads sound
   */
  load_sound() {

  }
}