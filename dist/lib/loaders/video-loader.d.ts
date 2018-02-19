import { ILoaderPromise } from '../models';
export declare class VideoLoader {
    private videoPromise;
    private loaderPromise;
    private urls;
    constructor();
    queue(url: string): void;
    load(): Promise<ILoaderPromise[]>;
}
