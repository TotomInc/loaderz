import { LoadingData } from '../models';
export declare class ImageLoader {
    private urls;
    private promise;
    constructor();
    queue(urls: string[]): void;
    start(): PromiseLike<LoadingData[]>;
}
