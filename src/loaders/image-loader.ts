import * as Bluebird from 'bluebird';

import { LoadingData } from '../models/loading-data';

/**
 * The `ImageLoader` class make sure to pre-load an image URL by using the
 * `HTMLImageElement`. It creates a local `new Image()` with the specified URL
 * as a `src` and ensure it is entirely loaded or failed by using
 * `image.onload()` and `image.onerror()` events.
 */
export class ImageLoader {
  /**
   * List of URLs to load when calling the `start()` function.
   */
  private urls: string[] = [];

  /**
   * Add URLs to load. Return an array of queued URLs to load.
   *
   * @param newURLs an array of URLs to add for the loading sequence
   * @returns an array of already queued URLs for the loading sequence
   */
  public queue(newURLs: string[]) {
    newURLs.forEach(url => this.urls.push(url));

    return this.urls;
  }

  /**
   * Start the loading of all URls registered, create an array of promises
   * generated by the `promise` function. Return a `Promise.all()` of all
   * image promises.
   *
   * @returns a `Promise.all()` of all image-promises
   */
  public start() {
    const promises = this.urls.map(url => this.promise(url));

    return Bluebird.Promise.all(promises);
  }

  /**
   * Create a dummy `HTMLImageElement` with the URL as the src attribute inside
   * a promise, that is resolved with the `image.onload` event or rejected with
   * the `image.onerror` event.
   *
   * @param url image-url to load
   * @returns the image-promise generated
   */
  private promise(url: string) {
    return new Bluebird.Promise<LoadingData>((resolve, reject) => {
      const image = new Image();

      image.onload = () => resolve({ url, loaded: true, type: 'image' });
      image.onerror = () => reject({ url, loaded: false, type: 'image' });
      image.src = url;
    });
  }
}