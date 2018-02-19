import { ILoaderPromise } from './index';
/** Handle all ressources loaders and interact with them. */
export declare class Loader {
    private audioloader;
    private imageloader;
    private videoloader;
    private loaderPromise;
    constructor();
    /**
     * Queue a ressource for future loading.
     * @param type - can be 'audio', 'image' or 'video', specify the type of the ressource to load
     * @param src - url/src of the ressource to load
     */
    queue(type: 'audio' | 'image' | 'video', src: string): void;
    /**
     * Load all queued ressources.
     * @return - return an array of loaded resources: [audios, images, videos].
     */
    load(): Promise<ILoaderPromise[]>;
}
