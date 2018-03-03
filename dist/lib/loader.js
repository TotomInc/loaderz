"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const loaders_1 = require("./loaders");
class Loader {
    constructor() {
        this.imageloader = new loaders_1.ImageLoader();
    }
    queue(type, src) {
        let urls = (!Array.isArray(src)) ? [src] : src;
        switch (type) {
            case 'image': {
                this.imageloader.queue(urls);
            }
        }
    }
    start() {
        return this.imageloader.start().then((res) => {
            const imagesNotLoaded = res.filter((status) => !status.loaded);
            if (imagesNotLoaded.length > 0) {
                console.warn('🚨 [loaderz] some image(s) have failed to load:', imagesNotLoaded);
            }
        });
    }
}
exports.Loader = Loader;
