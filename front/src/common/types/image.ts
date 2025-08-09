export interface ExistingImage {
  type: 'existing';
  url: string;
  id?: string;
}

export interface NewImage {
  type: 'new';
  file: File;
  preview: string;
}

export type ImageState = ExistingImage | NewImage;
