import { ILoaderPromise } from './model';

export class AudioLoader {
  private audioPromise: (path: string) => Promise<ILoaderPromise>;
  private loaderPromise: (paths: string[]) => Promise<ILoaderPromise[]>;

  private urls: string[] = [];

  constructor() {
    this.audioPromise = (path) => new Promise<ILoaderPromise>((resolve) => {
      const audio: HTMLAudioElement = new Audio();
      audio.oncanplaythrough = () => resolve({ path, status: 'OK' });
      audio.onerror = () => resolve({ path, status: 'ERR' });
      audio.src = path;
    });

    this.loaderPromise = (paths) => Promise.all(paths.map(this.audioPromise));
  }

  public queue(url: string): void {
    this.urls.push(url);
  }

  public load(): Promise<ILoaderPromise[]> {
    return this.loaderPromise(this.urls);
  }
}
