import { LoadingData } from './models/loading-data';
import { ResourceType } from './models/resource-type';
import { MediaData } from './models/media-data';
import { ImageLoader } from './loaders/image-loader';
import { MediaLoader } from './loaders/media-loader';
import { Logger } from './logger';

class Loader {
  private logger: Logger;
  private imageLoader: ImageLoader;
  private mediaLoader: MediaLoader;

  constructor() {
    this.logger = new Logger();

    this.imageLoader = new ImageLoader();
    this.mediaLoader = new MediaLoader();
  }

  /**
   * Add a new resource to the loading queue, automatically handle what type
   * of resource and how to load it.
   *
   * @param type type of the resource to load
   * @param src an url or array of urls to load
   * @returns returns the instance of itself
   */
  public queue(type: ResourceType, src: string | string[]): this {
    const urls = !Array.isArray(src) ? [src] : src;

    if (type === 'image') {
      this.imageLoader.queue(urls);
    } else if (type === 'audio' || type === 'video') {
      const medias: MediaData[] = [];

      urls.forEach(url => medias.push({ type, url }));

      this.mediaLoader.queue(medias);
    }

    return this;
  }

  /**
   * Start the loading sequence. Return an array of `LoadingData` to check the
   * status of loaded resources.
   */
  public start(): PromiseLike<LoadingData[]> {
    const allResources: LoadingData[] = [];

    return this.imageLoader.start()
      .then((res) => {
        const imagesNotLoaded = res.filter(status => !status.loaded);

        res.forEach(element => allResources.push(element));

        if (imagesNotLoaded.length > 0) {
          this.logger.warn('some image(s) have failed to load:', imagesNotLoaded);
        }

        return this.mediaLoader.start();
      })
      .then((res) => {
        const mediasNotLoaded = res.filter(status => !status.loaded);

        res.forEach(element => allResources.push(element));

        if (mediasNotLoaded.length > 0) {
          this.logger.warn('some media(s) have failed to load:', mediasNotLoaded);
        }

        return allResources;
      });
  }
}

export { Logger };
export default Loader;
