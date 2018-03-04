"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const loaders_1 = require("./loaders");
class Loader {
    constructor() {
        this.medialoder = new loaders_1.MediaLoader();
        this.imageloader = new loaders_1.ImageLoader();
    }
    queue(type, src) {
        let urls = (!Array.isArray(src)) ? [src] : src;
        if (type === 'audio' || type === 'video') {
            const medias = [];
            urls.map((url) => medias.push({ type, url }));
            this.medialoder.queue(medias);
        }
        else if (type === 'image') {
            this.imageloader.queue(urls);
        }
    }
    start() {
        const allResources = [];
        /** Load each elements from each loader one-by-one */
        return this.imageloader.start().then((res) => {
            const imagesNotLoaded = res.filter((status) => !status.loaded);
            res.forEach((element) => allResources.push(element));
            if (imagesNotLoaded.length > 0) {
                console.warn('🚨 [loaderz] some image(s) have failed to load:', imagesNotLoaded);
            }
            return this.medialoder.start();
        }).then((res) => {
            const mediasNotLoaded = res.filter((status) => !status.loaded);
            res.forEach((element) => allResources.push(element));
            if (mediasNotLoaded.length > 0) {
                console.warn('🚨 [loaderz] some media(s) have failed to load, maybe because your browser doesn\'t support this media type:', mediasNotLoaded);
            }
            return allResources;
        });
    }
}
exports.Loader = Loader;
