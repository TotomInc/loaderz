# loaderz

[![Build Status](https://travis-ci.org/TotomInc/loaderz.svg?branch=master)](https://travis-ci.org/TotomInc/loaderz) [![license](https://img.shields.io/david/dev/totominc/loaderz.svg)]() [![license](https://img.shields.io/npm/v/loaderz.svg)]() [![license](https://img.shields.io/github/license/mashape/apistatus.svg)]()

> A very easy-to-use asset-loader using promises. Supports images, audio and video. Fully documented for a perfect usage in your TypeScript projects.

## Installation

Install using `yarn` or `npm`:

- `yarn add loaderz`
- `npm install loaderz --save`

## Usage

```typescript
// Default export of Loaderz is the Loader, but there are also named exports of
// classes used internally (i.e. Logger).
import Loader, { Logger } from '../src/loaderz';

// A list of heavy images to load, it could be art-assets for your HTML5 game
const images = [
  'https://images.unsplash.com/photo-1549360336-6a77ea5193eb',
  'https://images.unsplash.com/photo-1549379458-e8f7034360a9',
  'https://images.unsplash.com/photo-1548175850-b5a765959436',
];

// Some audio elements to spice-up your HTML5 game
const audios = [
  'http://www.sample-videos.com/audio/mp3/crowd-cheering.mp3',
  'http://www.sample-videos.com/audio/mp3/wave.mp3',
];

// Instanciate the loader, you can easily implement it anywhere in your project
const loader = new Loader();

// Additionnal step, instanciate the Logger (this is not required for a normal
// usage)
const logger = new Logger();

// Queue all our different resources (we can chain since queue returns the
// instance of loader)
loader
  .queue('image', images)
  .queue('audio', audios);

// Start loading the resources and have a full control of the global loading
// state using a promise and return a response with all elements loaded
loader.start()
  .then(response => logger.log('All urls have been loaded, do whatever you want here:', response));
```

- `Loader#queue(type: string, src: string | string[])`: accepts 3 different types of medias (audio, image, video).
- `Loader#start()`: used to load all the queued resources. Returns a global promise of the resources loading.

- `Loader#queuedImages`: an array of URLs of images queued to load.
- `Loader#queuedMedias`: an array of `MediaData` elements queued to load.

## Contribute

All the code is written in TypeScript. Feel free to contribute by creating issues, PRs or suggesting new features:

1. Fork and clone the repo: `git@github.com:username/loaderz.git`
2. Install all dev-deps: `yarn install` or `npm install`
3. Run the demo: `yarn demo` (`localhost:8080`)
4. Edit some files
5. Run tests: `yarn test` or `npm test`
   - (optional) run `yarn lint` or `npm run lint` to automatically lint the files
6. Commit and push your edits on a separate branch
7. Create a PR which points on the `develop` branch

## License

Under MIT license, view the license file for more informations.
