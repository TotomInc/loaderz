"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bluebird_1 = require("bluebird");
class AudioLoader {
    constructor() {
        this.urls = [];
        /* Initialize the single-promise function used for each audio */
        this.promise = (url) => new bluebird_1.Promise((resolve, reject) => {
            const audio = new Audio();
            audio.oncanplaythrough = () => resolve({ loaded: true, url, type: 'audio' });
            audio.onerror = () => resolve({ loaded: false, url, type: 'audio' });
            audio.src = url;
        });
    }
    queue(urls) {
        urls.forEach((url) => this.urls.push(url));
    }
    start() {
        const promises = this.urls.map((url) => this.promise(url));
        return bluebird_1.Promise.all(promises);
    }
}
exports.AudioLoader = AudioLoader;
