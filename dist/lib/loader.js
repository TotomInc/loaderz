"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const loaders_1 = require("./loaders");
class Loader {
    constructor() {
        this.audioloader = new loaders_1.AudioLoader();
        this.imageloader = new loaders_1.ImageLoader();
    }
    queue(type, src) {
        let urls = (!Array.isArray(src)) ? [src] : src;
        if (type === 'audio') {
            this.audioloader.queue(urls);
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
            return this.audioloader.start();
        }).then((res) => {
            const audiosNotLoaded = res.filter((status) => !status.loaded);
            res.forEach((element) => allResources.push(element));
            if (audiosNotLoaded.length > 0) {
                console.warn('🚨 [loaderz] some audio(s) have failed to load:', audiosNotLoaded);
            }
            return allResources;
        });
    }
}
exports.Loader = Loader;
