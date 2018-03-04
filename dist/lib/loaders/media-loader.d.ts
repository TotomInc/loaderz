import { LoadingData, MediaData } from '../models';
/** A media element can be a video or audio */
export declare class MediaLoader {
    private medias;
    private promise;
    constructor();
    queue(media: MediaData[]): void;
    start(): PromiseLike<LoadingData[]>;
}
