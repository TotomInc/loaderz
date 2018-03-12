# loaderz

[![Build Status](https://travis-ci.org/TotomInc/loaderz.svg?branch=master)](https://travis-ci.org/TotomInc/loaderz) [![license](https://img.shields.io/david/dev/totominc/loaderz.svg)]() [![license](https://img.shields.io/npm/v/loaderz.svg)]() [![license](https://img.shields.io/github/license/mashape/apistatus.svg)]()

> A very easy-to-use asset-loader using promises. Supports images, audio and video.

## Installation

Install using `yarn` or `npm`:

- `yarn add loaderz`
- `npm install loaderz --save`

You can also try the latest features that are not currently live with the `@next` tag: `yarn add loaders@next`

## Usage

```typescript
import { Loader } from 'loaderz';

const assetLoader = new Loader();
const images = [
  'https://picsum.photos/450',
  'https://picsum.photos/550',
  'https://picsum.photos/650',
];

assetLoader.queue('image', images);
assetLoader.queue('audio', 'http://www.noiseaddicts.com/samples_1w72b820/3721.mp3');
assetLoader.queue('video', 'http://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_5mb.mp4');

assetLoader.start().then((response) => console.log('All urls have been loaded, do whatever you want here:', response));
```

- `Loader#queue:type, url(string | string[])`: accepts 3 different types (audio, image, video).
- `Loader#start`: used to load all the queued resources. Returns a promise so you can chain with `then` and `catch`.

## Contribute

All the code is written in Typescript. Feel free to contribute by creating issues and PRs:

1. Fork and clone the repo: `git@github.com:username/loaderz.git`
2. Install all dev-deps: `yarn install` or `npm install`
3. Run the demo: `yarn demo` (`localhost:8080`)
4. Edit some files
5. Run tests: `yarn test`
6. Build lib: `yarn build`
6. Commit and push your edits, then create a PR

## License

Under MIT license, view the license file for more information.
