import { ImageGeneration } from "../../../domains/imageGeneration/ImageHistory";
import { Container } from "../../../domains/layout/Container";

export interface ImageItemProps {
  image: ImageGeneration;
}

export function ImageItem({ image }: ImageItemProps): JSX.Element {
  return (
    <div className="ImageItem" key={image.id}>
      <Container>
        Prompt: {image.prompt}
        <GeneratedImage src={image.url} />
      </Container>
    </div>
  );
}

function GeneratedImage({ src }: { src: string }): JSX.Element {
  return (
    <div className="text-center">
      <a href={src} target="_blank">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={src}
          className="inline-block mx-auto w-full max-w-[50vh]"
          src={src}
        />
      </a>
    </div>
  );
}
