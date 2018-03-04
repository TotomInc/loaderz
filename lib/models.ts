export interface LoadingData {
  loaded: boolean;
  url: string;
  type: 'audio' | 'image' | 'video';
}

export interface MediaData {
  url: string;
  type: 'audio' | 'video';
}
