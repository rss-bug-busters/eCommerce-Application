import { FC, useState, useRef, useEffect } from 'react';
import { Image } from '@commercetools/platform-sdk';

interface SliderProperties {
  className?: string;
  galleryHandler?: (index: number) => void;
  images: Image[];
  isFullScreen?: boolean;
  showingIndex?: number;
}

const HorizontalSlider: FC<SliderProperties> = function ({
  images,
  className,
  isFullScreen = false,
  showingIndex = 0,
  galleryHandler,
}) {
  const [currentIndex, setCurrentIndex] = useState(showingIndex);
  const sliderReference = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    if (sliderReference.current) {
      sliderReference.current.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((previous) => (previous + 1) % images.length);
  };

  const previousSlide = () => {
    setCurrentIndex((previous) => (previous === 0 ? images.length - 1 : previous - 1));
  };

  const handleTouchStart = (event: React.TouchEvent) => {
    touchStartX.current = event.touches[0]?.clientX ?? 0;
    touchEndX.current = event.touches[0]?.clientX ?? 0;
  };

  const handleTouchMove = (event: React.TouchEvent) => {
    touchEndX.current = event.touches[0]?.clientX ?? 0;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 100) {
      nextSlide();
    }

    if (touchStartX.current - touchEndX.current < -100) {
      previousSlide();
    }
  };

  const clickHandler = () => {
    if (!isFullScreen && galleryHandler) {
      galleryHandler(currentIndex);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return images.length > 1 ? (
    <div className={`${className ?? ''} relative w-full overflow-hidden`}>
      <div
        className="absolute top-0 left-0 flex h-full transition-transform duration-500 ease-in-out"
        ref={sliderReference}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {images.length > 1 &&
          images.map((image, index) => (
            <div
              key={image.url}
              className="my-1 cursor-pointer min-w-full flex items-center justify-center"
              onClick={clickHandler}
              role="button"
              tabIndex={0}
              onKeyDown={() => {}}
            >
              <img
                src={image.url}
                alt={`Slide ${index}`}
                className={`${isFullScreen ? 'lg:w-auto lg:h-full w-full h-auto' : ' h-full w-auto'}`}
              />
            </div>
          ))}
      </div>
      <button
        type="button"
        onClick={previousSlide}
        className="btn-icon absolute left-4 top-1/2 transform -translate-y-1/2 bg-zinc-800 text-white text-4xl"
      >
        ←
      </button>
      <button
        type="button"
        onClick={nextSlide}
        className="btn-icon absolute right-4 top-1/2 transform -translate-y-1/2 bg-zinc-800 text-white text-4xl"
      >
        →
      </button>
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 p-1 bg-zinc-800/70 rounded-full">
        {images.map((img, index) => (
          <button
            type="button"
            key={img.url}
            className={`w-4 h-4 rounded-full ${index === currentIndex ? 'bg-cyan-700' : 'bg-zinc-400'}`}
            onClick={() => goToSlide(index)}
          >
            {' '}
          </button>
        ))}
      </div>
    </div>
  ) : (
    <div
      className="mb-5 cursor-pointer rounded-xl overflow-hidden max-h-[600px]"
      onClick={clickHandler}
      role="button"
      tabIndex={0}
      onKeyDown={() => {}}
    >
      <img src={images[0]?.url} alt="Slide" className="mx-auto h-full w-auto" />
    </div>
  );
};

export default HorizontalSlider;
