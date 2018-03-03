export declare class Loader {
    private imageloader;
    constructor();
    queue(type: 'image', src: string | string[]): void;
    start(): PromiseLike<void>;
}
