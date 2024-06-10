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
    <div className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-gray-800 bg-opacity-70">
      <div className="relative h-full w-full">
        <button
          type="button"
          onClick={onClose}
          className="btn-icon absolute right-4 top-4 z-50 bg-zinc-800 text-3xl text-white"
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
