import { Image } from '@commercetools/platform-sdk';
import Modal from '@components/ui/Modal/Modal';
import { FC, useState } from 'react';

interface SliderProperties {
  className?: string;
  images: Image[] | undefined;
}

const ImageSlider: FC<SliderProperties> = function ({ images, className }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div className={`${className ?? ''} flex items-center justify-center`}>
      {images && (
        <>
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
                    openModal();
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
          <div
            className="relative"
            onClick={openModal}
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                openModal();
              }
            }}
          >
            <button
              className="absolute bottom-4 right-12 bg-zinc-700/30 text-zinc-100 p-2 z-10 cursor-pointer rounded-full"
              onClick={previousSlide}
              type="button"
            >
              ←
            </button>
            <img
              src={images[currentIndex]?.url}
              alt={`Slide ${currentIndex}`}
              className="w-auto max-h-[36rem] rounded-xl"
            />
            <button
              className="absolute bottom-4 right-3 bg-zinc-700/30 text-zinc-100 p-2 z-10 cursor-pointer rounded-full"
              onClick={nextSlide}
              type="button"
            >
              →
            </button>
          </div>
          <Modal active={isModalOpen} setActive={setIsModalOpen}>
            <ImageSlider images={images} />
          </Modal>
        </>
      )}
    </div>
  );
};

export default ImageSlider;
