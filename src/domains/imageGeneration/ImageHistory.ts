export interface ImageGeneration {
  id: string;
  prompt: string;
  url: string;
}

export interface ImageHistory {
  images: ImageGeneration[];
}
