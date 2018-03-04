import { LoadingData } from './models';
export declare class Loader {
    private medialoder;
    private imageloader;
    constructor();
    queue(type: 'image' | 'audio' | 'video', src: string | string[]): void;
    start(): PromiseLike<LoadingData[]>;
}
