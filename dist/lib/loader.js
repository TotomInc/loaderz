"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
/** Handle all ressources loaders and interact with them. */
class Loader {
    constructor() {
        this.audioloader = new index_1.AudioLoader();
        this.imageloader = new index_1.ImageLoader();
        this.videoloader = new index_1.VideoLoader();
        this.loaderPromise = () => Promise.all([
            this.audioloader.load(),
            this.imageloader.load(),
            this.videoloader.load(),
        ]);
    }
    /**
     * Queue a ressource for future loading.
     * @param type - can be 'audio', 'image' or 'video', specify the type of the ressource to load
     * @param src - url/src of the ressource to load
     */
    queue(type, src) {
        if (type === 'audio') {
            this.audioloader.queue(src);
        }
        else if (type === 'image') {
            this.imageloader.queue(src);
        }
        else if (type === 'video') {
            this.videoloader.queue(src);
        }
    }
    /**
     * Load all queued ressources.
     * @return - return an array of loaded resources: [audios, images, videos].
     */
    load() {
        return this.loaderPromise();
    }
}
exports.Loader = Loader;
