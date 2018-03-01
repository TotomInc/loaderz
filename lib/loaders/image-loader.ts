import { Promise } from 'bluebird';

import { LoadingData } from '../models';

export class ImageLoader {
  private urls: string[] = [];
  private promise: (url: string) => PromiseLike<LoadingData>;

  constructor() {
    /* Initialize the single-promise function used for each image */
    this.promise = (url) => new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve({ loaded: true, url });
      image.onerror = () => resolve({ loaded: false, url });
      image.src = url;
    });
  }

  public queue(url: string): void {
    this.urls.push(url);
  }

  public start(): PromiseLike<LoadingData[]> {
    const promises = this.urls.map((url) => this.promise(url));

    return Promise.all(promises);
  }
}
