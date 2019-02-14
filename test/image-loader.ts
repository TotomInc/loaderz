// tslint:disable:import-name
import test from 'ava';

import { ImageMock } from './helpers/ImageMock';
import Loader from '../src/loaderz';

/**
 * Before running all `ImageLoader` tests, we need to register the `ImageMock`
 * class globally, so it will take over the default `HTMLImageElement` used by
 * the `ImageLoader`. By doing this, we have a full control over the default
 * `Image` functions such as `onload` and `onerror`.
 */
test.before((t) => {
  // @ts-ignore
  global.Image = ImageMock;
});

test('add an image URL to the image-loader array', (t) => {
  const loader = new Loader();

  loader.queue('image', 'https://example.com/image.jpg');

  t.is(loader.queuedImages.length, 1);
});

test('add an array of images URLs to the image-loader array', (t) => {
  const loader = new Loader();
  const urls = [
    'https://example.com/image.jpg',
    'https://example.com/image.png',
    'https://example.com/image.gif',
  ];

  loader.queue('image', urls);

  t.is(loader.queuedImages.length, urls.length);
  t.deepEqual(loader.queuedImages, urls);
});

test('successfully load an image', async (t) => {
  const loader = new Loader();

  loader.queue('image', 'https://images.unsplash.com/photo-1549403610-177341eb0f67');

  const loaderResponse = await loader.start();
  const allLoaded = loaderResponse.every(element => element.loaded);

  t.true(allLoaded);
  t.is(loaderResponse.length, 1);
});

test('successfully load an array of images', async (t) => {
  const loader = new Loader();
  const urls = [
    'https://example.com/image.jpg',
    'https://example.com/image.png',
    'https://example.com/image.gif',
  ];

  loader.queue('image', urls);

  const loaderResponse = await loader.start();
  const allLoaded = loaderResponse.every(element => element.loaded);

  t.true(allLoaded);
  t.is(loaderResponse.length, urls.length);
});
