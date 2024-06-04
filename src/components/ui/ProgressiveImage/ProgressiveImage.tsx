import { ImgHTMLAttributes, useState, useEffect, ReactNode } from 'react';

type ImageProperties = ImgHTMLAttributes<HTMLImageElement> & {
  placeholder: ReactNode;
};

function ProgressiveImage({ src, alt, placeholder, ...properties }: ImageProperties) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const img = new Image();

    img.src = src ?? '';
    img.addEventListener('load', () => {
      setIsLoading(false);
    });
  }, [src]);

  if (isLoading) {
    return placeholder;
  }

  return <img src={src} {...properties} alt={alt} />;
}

export default ProgressiveImage;
