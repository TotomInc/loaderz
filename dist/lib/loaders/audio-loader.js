"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AudioLoader {
    constructor() {
        this.urls = [];
        this.audioPromise = (path) => new Promise((resolve) => {
            const audio = new Audio();
            audio.oncanplaythrough = () => resolve({ path, status: 'OK' });
            audio.onerror = () => resolve({ path, status: 'ERR' });
            audio.src = path;
        });
        this.loaderPromise = (paths) => Promise.all(paths.map(this.audioPromise));
    }
    queue(url) {
        this.urls.push(url);
    }
    load() {
        return this.loaderPromise(this.urls);
    }
}
exports.AudioLoader = AudioLoader;
