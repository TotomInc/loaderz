import { Promise } from 'bluebird';

import { LoadingData } from '../models';

export class AudioLoader {
  private urls: string[] = [];
  private promise: (url: string) => PromiseLike<LoadingData>;

  constructor() {
    /* Initialize the single-promise function used for each audio */
    this.promise = (url) => new Promise((resolve, reject) => {
      const audio = new Audio();
      audio.oncanplaythrough = () => resolve({ loaded: true, url, type: 'audio' });
      audio.onerror = () => resolve({ loaded: false, url, type: 'audio' });
      audio.src = url;
    });
  }

  public queue(urls: string[]): void {
    urls.forEach((url) => this.urls.push(url));
  }

  public start(): PromiseLike<LoadingData[]> {
    const promises = this.urls.map((url) => this.promise(url));

    return Promise.all(promises);
  }
}
