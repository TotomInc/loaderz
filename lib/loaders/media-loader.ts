import { Promise } from 'bluebird';

import { LoadingData, MediaData } from '../models';

/** A media element can be a video or audio */
export class MediaLoader {
  private medias: MediaData[] = [];
  private promise: (media: MediaData) => PromiseLike<LoadingData>;

  constructor() {
    /* Initialize the single-promise function used for each media */
    this.promise = (media) => new Promise((resolve, reject) => {
      const element = document.createElement(media.type);
      element.oncanplaythrough = () => resolve({ loaded: true, url: media.url, type: media.type });
      element.onerror = () => resolve({ loaded: false, url: media.url, type: media.type });
      element.src = media.url;
    });
  }

  public queue(media: MediaData[]): void {
    media.forEach((media) => this.medias.push(media));
  }

  public start(): PromiseLike<LoadingData[]> {
    const promises = this.medias.map((media) => this.promise(media));

    return Promise.all(promises);
  }
}
