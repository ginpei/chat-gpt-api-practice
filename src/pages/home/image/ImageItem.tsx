import { useState } from "react";
import { ImageGeneration } from "../../../domains/imageGeneration/ImageHistory";
import { Container } from "../../../domains/layout/Container";

export interface ImageItemProps {
  image: ImageGeneration;
}

const svgNoImage = /* svg */ `
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'>
    <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-size='10' fill='#ccc'>
      No image
    </text>
  </svg>
`;

const fallbackUrl = `data:image/svg+xml,${encodeURIComponent(svgNoImage)}`;

export function ImageItem({ image }: ImageItemProps): JSX.Element {
  const [errored, setErrored] = useState(false);

  const onError = () => {
    setErrored(true);
  };

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
                onError={onError}
                src={errored ? fallbackUrl : image.url}
              />
            </a>
          </div>
          {errored && (
            <p className="text-red-500">
              Failed to load. Most likely the image has expired.
            </p>
          )}
          <p>
            <small className="text-stone-500 pr-1 select-none">Prompt:</small>
            {image.prompt}
          </p>
        </div>
      </Container>
    </div>
  );
}
