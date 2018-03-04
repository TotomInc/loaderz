import { AudioLoader, ImageLoader } from './loaders';

import { LoadingData } from './models';

export class Loader {
  private audioloader: AudioLoader;
  private imageloader: ImageLoader;

  constructor() {
    this.audioloader = new AudioLoader();
    this.imageloader = new ImageLoader();
  }

  public queue(type: 'image' | 'audio', src: string | string[]): void {
    let urls: string[] = (!Array.isArray(src)) ? [src] : src;

    if (type === 'audio') {
      this.audioloader.queue(urls);
    } else if (type === 'image') {
      this.imageloader.queue(urls);
    }
  }

  public start(): PromiseLike<LoadingData[]> {
    const allResources: LoadingData[] = [];

    /** Load each elements from each loader one-by-one */
    return this.imageloader.start().then((res) => {
      const imagesNotLoaded = res.filter((status) => !status.loaded);
      res.forEach((element) => allResources.push(element));

      if (imagesNotLoaded.length > 0) {
        console.warn('🚨 [loaderz] some image(s) have failed to load:', imagesNotLoaded);
      }

      return this.audioloader.start();
    }).then((res) => {
      const audiosNotLoaded = res.filter((status) => !status.loaded);
      res.forEach((element) => allResources.push(element));

      if (audiosNotLoaded.length > 0) {
        console.warn('🚨 [loaderz] some audio(s) have failed to load:', audiosNotLoaded);
      }

      return allResources;
    });
  }
}
