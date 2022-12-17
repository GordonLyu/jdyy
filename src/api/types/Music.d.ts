export interface AddMusicRequest {
  author: string;
  musicName: string;
  coverFile?: File | any;
  musicFile?: File | any;
}

export interface UpdateMusicRequest {
  author?: string;
  musicName?: string;
  url:string;
  coverURL?: string;
}
