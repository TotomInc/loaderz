import { ILoaderPromise } from '../models';
export declare class ImageLoader {
    private imagePromise;
    private loaderPromise;
    private urls;
    constructor();
    queue(url: string): void;
    load(): Promise<ILoaderPromise[]>;
}
