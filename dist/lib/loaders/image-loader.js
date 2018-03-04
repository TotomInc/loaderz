"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bluebird_1 = require("bluebird");
class ImageLoader {
    constructor() {
        this.urls = [];
        /* Initialize the single-promise function used for each image */
        this.promise = (url) => new bluebird_1.Promise((resolve, reject) => {
            const image = new Image();
            image.onload = () => resolve({ loaded: true, url, type: 'image' });
            image.onerror = () => resolve({ loaded: false, url, type: 'image' });
            image.src = url;
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
exports.ImageLoader = ImageLoader;
