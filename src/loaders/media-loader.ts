import * as Bluebird from 'bluebird';

import { LoadingData } from '../models/loading-data';
import { MediaData } from '../models/media-data';

/**
 * The `MediaLoader` class make sure to pre-load a media (video/audio) URL by
 * using the `HTMLAudioElement` or `HTMLVideoElement`. It creates a local
 * `new Audio()` or `new Video()` with the specified URL as a `src` and ensure
 * it is entirely loaded or failed by using `element.oncanplaythrough()` and
 * `element.onerror()` events.
 */
export class MediaLoader {
  /**
   * Array of `MediaData` to load when calling the `start()` function.
   */
  private medias: MediaData[] = [];

  /**
   * Add URLs to load. Return an array of queued URLs to load.
   *
   * @param newURLs an array of URLs to add for the loading sequence
   * @returns an array of already queued URLs for the loading sequence
   */
  public queue(media: MediaData[]): void {
    media.forEach(media => this.medias.push(media));
  }

  /**
   * Start the loading of all URls registered, create an array of promises
   * generated by the `promise` function. Return a `Promise.all()` of all
   * media promises.
   *
   * @returns a `Promise.all()` of all media-promises
   */
  public start() {
    const promises = this.medias.map(media => this.promise(media));

    return Promise.all(promises);
  }

  /**
   * Create dummy `HTMLAudioElement` or `HTMLVideoElement` with the URL as the
   * src attribute inside a promise, that is resolved with the
   * `element.oncanplaythrough` event or rejected with the `element.onerror`
   * event.
   *
   * @param media media-data containing its type and the URL
   * @returns the media-promise generated
   */
  private promise(media: MediaData) {
    return new Bluebird.Promise<LoadingData>((resolve, reject) => {
      const element = document.createElement(media.type);

      element.oncanplaythrough = () => resolve({ loaded: true, url: media.url, type: media.type });
      element.onerror = () => resolve({ loaded: false, url: media.url, type: media.type });
      element.src = media.url;
    });
  }
}