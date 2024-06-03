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
              <div className="flex flex-col max-h-full overflow-y-auto mr-5">
                {images.map((image, index) => (
                  <div
                    key={image.url}
                    className="my-1 cursor-pointer relative"
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
                      className="w-28 h-auto rounded-xl"
                    />
                    <div
                      className={`absolute top-0 left-0 w-full h-full rounded-xl ${index === currentIndex ? 'bg-zinc-900/15 dark:bg-zinc-800/30' : ''}`}
                    />
                  </div>
                ))}
              </div>
            )}
            <div
              className="relative min-h-90 max-h-[36rem] aspect-square"
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
                className="w-full h-full  rounded-xl"
              />
              {images.length > 1 && (
                <div className="absolute bottom-4 right-3 flex items-center justify-center gap-4">
                  <button
                    className=" bg-zinc-700/40 text-zinc-100 z-10 text-3xl btn-icon"
                    onClick={previousSlide}
                    type="button"
                  >
                    ←
                  </button>
                  <button
                    className=" bg-zinc-700/40 text-zinc-100 z-10 text-3xl btn-icon"
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
              className="h-[500px] mb-10"
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
