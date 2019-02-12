// Consuming the module in your project would look like:
// import { Loader } from 'loaderz';
import { Loader } from '../src/loaderz';

// Additionnally, we can import the Logger from which is used internally by
// Loaderz (for demonstration purposes)
import { Logger } from '../src/logger';

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

// Instance the loader, you can easily implement it anywhere in your project
const loader = new Loader();

// Additionnal step, instanciate the Logger (this is not required for a normal
// usage)
const logger = new Logger();

// Queue all our different resources (we can chain since)
loader
  .queue('image', images)
  .queue('audio', audios);

// Start loading the resources and have a full control of the loading state
// using a promise and return a response with all elements loaded
loader.start()
  .then(response => logger.log('All urls have been loaded, do whatever you want here:', response));
