import { ILoaderPromise } from '../models';

export class ImageLoader {
  private imagePromise: (path: string) => Promise<ILoaderPromise>;
  private loaderPromise: (paths: string[]) => Promise<ILoaderPromise[]>;

  private urls: string[] = [];

  constructor() {
    this.imagePromise = (path) => new Promise((resolve) => {
      const image: HTMLImageElement = new Image();
      image.onload = () => resolve({ path, status: 'OK' });
      image.onerror = () => resolve({ path, status: 'ERR' });
      image.src = path;
    });

    this.loaderPromise = (paths) => Promise.all(paths.map(this.imagePromise));
  }

  public queue(url: string): void {
    this.urls.push(url);
  }

  public load(): Promise<ILoaderPromise[]> {
    return this.loaderPromise(this.urls);
  }
}
