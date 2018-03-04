import { Loader } from '../dist';

const cats = [
  'http://www.catbreedslist.com/cat-wallpapers/American-Shorthair-kitten-look-towel-900x506.jpg',
  'http://www.catbreedslist.com/cat-wallpapers/Siamese-kitten-cute-lie-paws-900x506.jpg',
  'http://www.catbreedslist.com/cat-wallpapers/Maine-Coon-kitten-sitting-look-900x506.jpg',
];

const audios = [
  'http://www.sample-videos.com/audio/mp3/crowd-cheering.mp3',
  'http://www.sample-videos.com/audio/mp3/wave.mp3',
];

const loader = new Loader();

loader.queue('image', cats);
loader.queue('audio', audios);

loader.start().then((response) => {
  console.log('All urls have been loaded, do whatever you want here:', response);
});
