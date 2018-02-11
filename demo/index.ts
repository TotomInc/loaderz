import { Loader } from '../lib';

const Loaderz = new Loader();

Loaderz.queue('audio', 'http://sampleswap.org/mp3/artist/32777/m4rt3z_m4rt3z---Tribal-Fusion-160.mp3');
Loaderz.queue('audio', 'http://sampleswap.org/mp3/artist/18256/Indidjinous_Under-the-Radar--160.mp3');

Loaderz.queue('image', 'https://picsum.photos/1600/1600');
Loaderz.queue('image', 'https://picsum.photos/2400/2400');
Loaderz.queue('image', 'https://picsum.photos/3200/3200');

Loaderz.queue('video', 'http://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_30mb.mp4');
Loaderz.queue('video', 'http://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_5mb.mp4');

Loaderz.load().then((res) => console.log('All assets loaded:', res));

// @ts-ignore
window.Loaderz = Loaderz;
