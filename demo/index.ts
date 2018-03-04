// Consuming the module in your project would look like:
// import { Loader } from 'loaderz';
import { Loader } from '../dist';

// A list of heavy images to load, it could be art-assets for your HTML5 game
const images = [
  'http://www.sample-videos.com/img/Sample-jpg-image-500kb.jpg',
  'http://www.sample-videos.com/img/Sample-jpg-image-1mb.jpg',
  'http://www.sample-videos.com/img/Sample-png-image-500kb.png',
  'http://www.sample-videos.com/img/Sample-png-image-1mb.png',
];

// Some audio elements to spice-up your HTML5 game
const audios = [
  'http://www.sample-videos.com/audio/mp3/crowd-cheering.mp3',
  'http://www.sample-videos.com/audio/mp3/wave.mp3',
];

// Same for videos if you need to preload before playing
const videos = [
  'http://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_1mb.mp4',
  'http://www.sample-videos.com/video/flv/720/big_buck_bunny_720p_1mb.flv',
  'http://www.sample-videos.com/video/mkv/720/big_buck_bunny_720p_1mb.mkv',
];

// Instance the loader, you can easily implement it anywhere in your project
const loader = new Loader();

// Queue all our different resources
loader.queue('image', images);
loader.queue('audio', audios);
loader.queue('video', videos);

// Start loading the resources and have a full control of the load
// state using promise. Return a response with all elements loaded
loader.start().then((response) => {
  console.log('All urls have been loaded, do whatever you want here:', response);
});
