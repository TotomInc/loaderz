"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class VideoLoader {
    constructor() {
        this.urls = [];
        this.videoPromise = (path) => new Promise((resolve) => {
            const video = document.createElement('video');
            video.oncanplaythrough = () => resolve({ path, status: 'OK' });
            video.onerror = () => resolve({ path, status: 'ERR' });
            video.src = path;
        });
        this.loaderPromise = (paths) => Promise.all(paths.map(this.videoPromise));
    }
    queue(url) {
        this.urls.push(url);
    }
    load() {
        return this.loaderPromise(this.urls);
    }
}
exports.VideoLoader = VideoLoader;
