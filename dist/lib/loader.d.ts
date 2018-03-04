import { LoadingData } from './models';
export declare class Loader {
    private audioloader;
    private imageloader;
    constructor();
    queue(type: 'image' | 'audio', src: string | string[]): void;
    start(): PromiseLike<LoadingData[]>;
}
