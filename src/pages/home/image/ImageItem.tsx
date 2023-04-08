import { ImageGeneration } from "../../../domains/imageGeneration/ImageHistory";
import { Container } from "../../../domains/layout/Container";

export interface ImageItemProps {
  image: ImageGeneration;
}

export function ImageItem({ image }: ImageItemProps): JSX.Element {
  return (
    <div className="ImageItem border-b py-4">
      <Container>
        <div className="text-center flex flex-col gap-4">
          <div>
            <a href={image.url} target="_blank">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt={image.url}
                className="inline-block mx-auto w-full max-w-[50vh] border"
                src={image.url}
              />
            </a>
          </div>
          <p>
            <small className="text-stone-500 pr-1 select-none">Prompt:</small>
            {image.prompt}
          </p>
        </div>
      </Container>
    </div>
  );
}
