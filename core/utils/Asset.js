import Constants from 'utils/Constants';

export default class Asset {
  /**
   * indicates whether the asset is loaded or not
   */
  isReady = false;

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
    if (this.group_identifier === Constants.SPRITE) {
      return this.load_image();
    }

    // loads background
    if (this.group_identifier === Constants.BACKGROUND) {
      return this.load_background();
    }

    // loads sound
    if (this.group_identifier === Constants.SOUND) {
      return this.load_sound();
    }
  }

  /**
   * loads an image
   */
  load_image() {

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