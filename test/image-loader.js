import test from 'ava';
import path from 'path';

import { Loader } from '../dist';

test('load a single image in a array', (t) => {
  t.plan(2);

  const image = [
    path.join(__dirname, '/mocks/images/unicorn.png'),
  ];

  const loader = new Loader();
  loader.queue('image', image);

  return loader.start().then((res) => {
    const loaded = res.every((el) => el.loaded);
    t.is(loaded, true);
    t.is(res.length, image.length);
  });
});

test('load a single image in a string', (t) => {
  t.plan(1);

  const image = path.join(__dirname, '/mocks/images/yarn.png');
  const loader = new Loader();
  loader.queue('image', image);

  return loader.start().then((res) => {
    const loaded = res.every((el) => el.loaded);
    t.is(loaded, true);
  });
});

test('load multiples images in an array', (t) => {
  t.plan(2);

  const images = [
    path.join(__dirname, '/mocks/images/unicorn.png'),
    path.join(__dirname, '/mocks/images/octocat.png'),
    path.join(__dirname, '/mocks/images/yarn.png'),
  ];

  const loader = new Loader();
  loader.queue('image', images);

  return loader.start().then((res) => {
    const loaded = res.every((el) => el.loaded);
    t.is(loaded, true);
    t.is(res.length, images.length);
  });
});
