import { Image } from '@commercetools/platform-sdk';
import { FC, useState } from 'react';
import ImageGallery from '@components/ImageSlider/ImageGallery/ImageGallery';
import HorizontalSlider from '@components/ImageSlider/HorizontalSlider/HorizontalSlider';

interface SliderProperties {
  className?: string;
  direction: 'horizontal' | 'vertical';
  images: Image[] | undefined;
}

const ImageSlider: FC<SliderProperties> = function ({ images, className, direction }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const nextSlide = (event: React.MouseEvent) => {
    event?.stopPropagation();
    setCurrentIndex((previousIndex) => (previousIndex + 1) % images!.length);
  };

  const previousSlide = (event: React.MouseEvent) => {
    event.stopPropagation();
    setCurrentIndex(
      (previousIndex) => (previousIndex - 1 + images!.length) % images!.length
    );
  };

  const openGallery = (index: number) => {
    setCurrentIndex(index);
    setIsGalleryOpen(true);
  };

  const closeGallery = () => {
    setIsGalleryOpen(false);
  };

  return (
    images && (
      <>
        {direction === 'vertical' ? (
          <div className={`${className ?? ''} flex items-center justify-center`}>
            {images.length > 1 && (
              <div className="mr-5 flex max-h-full flex-col overflow-y-auto">
                {images.map((image, index) => (
                  <div
                    key={image.url}
                    className="relative my-1 cursor-pointer"
                    onClick={() => setCurrentIndex(index)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') {
                        openGallery(currentIndex);
                      }
                    }}
                  >
                    <img
                      src={image.url}
                      alt={`Slide ${index}`}
                      className="h-auto w-28 rounded-xl"
                    />
                    <div
                      className={`absolute left-0 top-0 h-full w-full rounded-xl ${index === currentIndex ? 'bg-zinc-900/15 dark:bg-zinc-800/30' : ''}`}
                    />
                  </div>
                ))}
              </div>
            )}
            <div
              className="min-h-90 relative aspect-square max-h-[36rem]"
              onClick={() => openGallery(currentIndex)}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  openGallery(currentIndex);
                }
              }}
            >
              <img
                src={images[currentIndex]?.url}
                alt={`Slide ${currentIndex}`}
                className="h-full w-full  rounded-xl"
              />
              {images.length > 1 && (
                <div className="absolute bottom-4 right-3 flex items-center justify-center gap-4">
                  <button
                    className=" btn-icon z-10 bg-zinc-700/40 text-3xl text-zinc-100"
                    onClick={previousSlide}
                    type="button"
                  >
                    ←
                  </button>
                  <button
                    className=" btn-icon z-10 bg-zinc-700/40 text-3xl text-zinc-100"
                    onClick={nextSlide}
                    type="button"
                  >
                    →
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <section className="flex justify-center">
            <HorizontalSlider
              images={images}
              className="mb-10 h-[500px]"
              galleryHandler={openGallery}
            />
          </section>
        )}
        {isGalleryOpen && (
          <ImageGallery
            images={images}
            initialIndex={currentIndex}
            onClose={closeGallery}
          />
        )}
      </>
    )
  );
};

export default ImageSlider;
