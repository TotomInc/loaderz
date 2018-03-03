import { ImageLoader } from './loaders';

import { LoadingData } from './models';

export class Loader {
  private imageloader: ImageLoader;

  constructor() {
    this.imageloader = new ImageLoader();
  }

  public queue(type: 'image', src: string | string[]): void {
    let urls: string[] = (!Array.isArray(src)) ? [src] : src;

    switch(type) {
      case 'image': {
        this.imageloader.queue(urls);
      }
    }
  }

  public start(): PromiseLike<LoadingData[]> {
    return this.imageloader.start().then((res) => {
      const imagesNotLoaded = res.filter((status) => !status.loaded);

      if (imagesNotLoaded.length > 0) {
        console.warn('🚨 [loaderz] some image(s) have failed to load:', imagesNotLoaded);
      }

      return res;
    });
  }
}
