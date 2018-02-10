import { AudioLoader, ImageLoader, VideoLoader } from './lib';
import { ILoaderPromise } from './lib';

/** Handle all ressources loaders and interact with them. */
export class Loader {
  private audioloader: AudioLoader;
  private imageloader: ImageLoader;
  private videoloader: VideoLoader;

  private loaderPromise: () => Promise<any[]>;

  constructor() {
    this.audioloader = new AudioLoader();
    this.imageloader = new ImageLoader();
    this.videoloader = new VideoLoader();

    // @ts-ignore
    this.loaderPromise = Promise.all([
      this.audioloader.load(),
      this.imageloader.load(),
      this.videoloader.load(),
    ]);
  }

  /**
   * Queue a ressource for future loading.
   * @param type - can be 'audio', 'image' or 'video', specify the type of the ressource to load
   * @param src - url/src of the ressource to load
   */
  public queue(type: 'audio' | 'image' | 'video', src: string): void {
    if (type === 'audio') {
      this.audioloader.queue(src);
    } else if (type === 'image') {
      this.imageloader.queue(src);
    } else if (type === 'video') {
      this.videoloader.queue(src);
    }
  }

  /**
   * Load all queued ressources.
   * @return - return an array of loaded resources: [audios, images, videos].
   */
  public load(): Promise<ILoaderPromise[]> {
    return this.loaderPromise();
  }
}
