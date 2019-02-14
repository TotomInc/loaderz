// tslint:disable:import-name
import test from 'ava';

import { MediaMock } from './helpers/MediaMock';
import Loader from '../src/loaderz';

/**
 * Before running all `MediaLoader` tests, we need to register the `MediaMock`
 * class globally, so it will take over the default `HTMLAudioElement` and
 * `HTMLVideoElement` used by the `MediaLoader`. By doing this, we have a full
 * control over the defaults `Audio` and `Media` classes functions such as
 * `oncanplaythrough` and `onerror`.
 */
test.before((t) => {
  // @ts-ignore
  global.Audio = MediaMock;
});

test('add an audio URL to the media-loader array', (t) => {
  const loader = new Loader();

  loader.queue('audio', 'https://example.com/audio.mp3');

  t.is(loader.queuedMedias.length, 1);
});

test('add an array of audios URLs to the media-loader array', (t) => {
  const loader = new Loader();
  const urls = [
    'https://example.com/audio.mp3',
    'https://example.com/audio.wav',
    'https://example.com/audio.flac',
  ];

  loader.queue('audio', urls);

  const queuedMediasAreAudios = loader.queuedMedias.every(media => media.type === 'audio');

  t.is(loader.queuedMedias.length, urls.length);
  t.true(queuedMediasAreAudios);
});

test('successfully load an audio', async (t) => {
  const loader = new Loader();

  loader.queue('audio', 'https://example.com/audio.mp3');

  const loaderResponse = await loader.start();
  const allLoaded = loaderResponse.every(element => element.loaded);

  t.true(allLoaded);
  t.is(loaderResponse.length, 1);
});

test('successfully load an array of audios URLs', async (t) => {
  const loader = new Loader();
  const urls = [
    'https://example.com/audio.mp3',
    'https://example.com/audio.wav',
    'https://example.com/audio.flac',
  ];

  loader.queue('audio', urls);

  const loaderResponse = await loader.start();
  const allLoaded = loaderResponse.every(element => element.loaded);

  t.true(allLoaded);
  t.is(loaderResponse.length, urls.length);
});
