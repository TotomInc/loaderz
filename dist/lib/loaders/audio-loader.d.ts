import { LoadingData } from '../models';
export declare class AudioLoader {
    private urls;
    private promise;
    constructor();
    queue(urls: string[]): void;
    start(): PromiseLike<LoadingData[]>;
}
