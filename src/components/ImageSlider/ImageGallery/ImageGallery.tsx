import { FC } from 'react';
import { Image } from '@commercetools/platform-sdk';
import HorizontalSlider from '@components/ImageSlider/HorizontalSlider/HorizontalSlider';

interface ImageGalleryProperties {
  images: Image[];
  initialIndex: number;
  onClose: () => void;
}

const ImageGallery: FC<ImageGalleryProperties> = function ({
  images,
  initialIndex,
  onClose,
}) {
  return (
    <div className="flex items-center justify-center bg-gray-800 bg-opacity-70 fixed top-0 left-0 w-screen h-screen z-50">
      <div className="relative w-full h-full">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 bg-zinc-800 text-white text-3xl btn-icon z-50"
        >
          X
        </button>
        <HorizontalSlider
          images={images}
          className="h-screen"
          isFullScreen
          showingIndex={initialIndex}
        />
      </div>
    </div>
  );
};

export default ImageGallery;
