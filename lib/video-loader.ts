import { ILoaderPromise } from './model';

export class VideoLoader {
  private videoPromise: (path: string) => Promise<ILoaderPromise>;
  private loaderPromise: (paths: string[]) => Promise<ILoaderPromise[]>;

  private urls: string[] = [];

  constructor() {
    this.videoPromise = (path) => new Promise((resolve) => {
      const video: HTMLVideoElement = document.createElement('video');
      video.oncanplaythrough = () => resolve({ path, status: 'OK' });
      video.onerror = () => resolve({ path, status: 'ERR' });
      video.src = path;
    });

    this.loaderPromise = (paths) => Promise.all(paths.map(this.videoPromise));
  }

  public queue(url: string): void {
    this.urls.push(url);
  }

  public load(): Promise<ILoaderPromise[]> {
    return this.loaderPromise(this.urls);
  }
}
