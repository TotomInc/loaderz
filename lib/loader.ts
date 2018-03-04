import { ImageLoader, MediaLoader } from './loaders';

import { LoadingData, MediaData } from './models';

export class Loader {
  private medialoder: MediaLoader;
  private imageloader: ImageLoader;

  constructor() {
    this.medialoder = new MediaLoader();
    this.imageloader = new ImageLoader();
  }

  public queue(type: 'image' | 'audio' | 'video', src: string | string[]): void {
    let urls: string[] = (!Array.isArray(src)) ? [src] : src;

    if (type === 'audio' || type === 'video') {
      const medias: MediaData[] = [];
      urls.map((url) => medias.push({ type, url }));
      this.medialoder.queue(medias);
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

      return this.medialoder.start();
    }).then((res) => {
      const mediasNotLoaded = res.filter((status) => !status.loaded);
      res.forEach((element) => allResources.push(element));

      if (mediasNotLoaded.length > 0) {
        console.warn('🚨 [loaderz] some media(s) have failed to load, maybe because your browser doesn\'t support this media type:', mediasNotLoaded);
      }

      return allResources;
    });
  }
}
