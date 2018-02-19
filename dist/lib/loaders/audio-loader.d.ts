import { ILoaderPromise } from '../models';
export declare class AudioLoader {
    private audioPromise;
    private loaderPromise;
    private urls;
    constructor();
    queue(url: string): void;
    load(): Promise<ILoaderPromise[]>;
}
