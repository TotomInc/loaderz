# loaderz

![Build status](https://travis-ci.org/TotomInc/loaderz.svg?branch=master) ![Version](https://img.shields.io/npm/v/loaderz.svg) ![License](https://img.shields.io/npm/l/loaderz.svg)

> A very easy-to-use asset-loader using promises. Support images, audio and video.

## Installation

Install using `yarn` or `npm`:

- `yarn add loaderz`
- `npm install loaderz --save`

## Usage

```typescript
import { Loader } from 'loaderz';

const assetLoader = new Loader();

assetLoader.queue('image', 'https://picsum.photos/450');
assetLoader.queue('audio', 'http://www.noiseaddicts.com/samples_1w72b820/3721.mp3');
assetLoader.queue('video', 'http://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_5mb.mp4');

assetLoader.load().then((res) => console.log('All assets loaded!', res));
```

- `Loader#queue:type, url`: accept 3 different types (audio, image, video).
- `Loader#load`: used to load all queued ressources. Return a promise so you can chain with `then` and `catch`.

## Contribute

All the code is written in Typescript. Feel free to contribute by creating issues and PRs:

1. Fork and clone the repo: `git@github.com:username/loaderz.git`
2. Install all dev-deps: `yarn install` or `npm install`
3. Run the demo: `yarn demo` (`localhost:8080`)
4. Edit some files. All differents loaders are in `lib/loaders`
5. Commit and push your edits, then create a PR

## License

Under MIT license, view the license file for more information.
