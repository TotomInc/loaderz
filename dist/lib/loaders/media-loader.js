"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bluebird_1 = require("bluebird");
/** A media element can be a video or audio */
class MediaLoader {
    constructor() {
        this.medias = [];
        /* Initialize the single-promise function used for each media */
        this.promise = (media) => new bluebird_1.Promise((resolve, reject) => {
            const element = document.createElement(media.type);
            element.oncanplaythrough = () => resolve({ loaded: true, url: media.url, type: media.type });
            element.onerror = () => resolve({ loaded: false, url: media.url, type: media.type });
            element.src = media.url;
        });
    }
    queue(media) {
        media.forEach((media) => this.medias.push(media));
    }
    start() {
        const promises = this.medias.map((media) => this.promise(media));
        return bluebird_1.Promise.all(promises);
    }
}
exports.MediaLoader = MediaLoader;
