# loaderz

> A very easy-to-use asset-loader using promises. Support images, audio and video.

## Installation

Install using `yarn` or `npm`:

- `yarn add loaderz --save`
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

## License

Under MIT license, view the license file for more information.
