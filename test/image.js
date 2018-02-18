import test from 'ava';

import Loader from '../dist';

test('load a single image', (t) => {
  t.plan(2);

  const loader = new Loader();

  loader.queue('image', 'https://www.wallpaperup.com/wallpaper/download/228439/1920/1212');

  return loader.load().then((result) => {
    const imageResult = result[1];
    const loaded = imageResult.every((url) => url.status === 'OK');

    t.is(loaded, true);
    t.is(imageResult.length, 1);
  });
});

test('load multiple images', (t) => {
  t.plan(2);

  const loader = new Loader();

  loader.queue('image', 'https://www.wallpaperup.com/wallpaper/download/228439/1920/1212');
  loader.queue('image', 'https://www.wallpaperup.com/wallpaper/download/991808/1920/1254');

  return loader.load().then((result) => {
    const imagesResults = result[1];
    const loaded = imagesResults.every((url) => url.status === 'OK');

    t.is(loaded, true);
    t.is(imagesResults.length, 2);
  });
});
