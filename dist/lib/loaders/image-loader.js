"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ImageLoader {
    constructor() {
        this.urls = [];
        this.imagePromise = (path) => new Promise((resolve) => {
            const image = new Image();
            image.onload = () => resolve({ path, status: 'OK' });
            image.onerror = () => resolve({ path, status: 'ERR' });
            image.src = path;
        });
        this.loaderPromise = (paths) => Promise.all(paths.map(this.imagePromise));
    }
    queue(url) {
        this.urls.push(url);
    }
    load() {
        return this.loaderPromise(this.urls);
    }
}
exports.ImageLoader = ImageLoader;
