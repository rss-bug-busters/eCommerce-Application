import { Image } from '@commercetools/platform-sdk';
import Modal from '@components/ui/Modal/Modal';
import { FC, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface SliderProperties {
  className?: string;
  direction: 'horizontal' | 'vertical';
  images: Image[] | undefined;
}

const ImageSlider: FC<SliderProperties> = function ({ images, className, direction }) {
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

  return direction === 'vertical' ? (
    <div className={`${className ?? ''} flex items-center justify-center`}>
      {images && (
        <>
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
          )}
          <div
            className="relative min-h-90 max-h-[36rem] aspect-square"
            onClick={openModal}
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                openModal();
              }
            }}
          >
            <img
              src={images[currentIndex]?.url}
              alt={`Slide ${currentIndex}`}
              className="w-full h-full  rounded-xl"
            />
            {images.length > 1 && (
              <>
                <button
                  className="absolute bottom-4 right-12 bg-zinc-700/30 text-zinc-100 p-2 z-10 cursor-pointer rounded-full"
                  onClick={previousSlide}
                  type="button"
                >
                  ←
                </button>
                <button
                  className="absolute bottom-4 right-3 bg-zinc-700/30 text-zinc-100 p-2 z-10 cursor-pointer rounded-full"
                  onClick={nextSlide}
                  type="button"
                >
                  →
                </button>
              </>
            )}
          </div>
          <Modal active={isModalOpen} setActive={setIsModalOpen}>
            <ImageSlider images={images} direction="horizontal" />
          </Modal>
        </>
      )}
    </div>
  ) : (
    <section className="flex justify-center">
      <div className="lg:mx-auto max-w-96 md:max-w-[36rem]">
        <Swiper
          modules={[Pagination, Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          pagination={{
            clickable: true,
          }}
          navigation
          grabCursor
        >
          {images.map((img, index) => (
            <SwiperSlide key={img.url}>
              <img src={img.url} alt={`Slide ${index}`} className="w-full rounded-xl" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ImageSlider;

// const ImageSlider: FC<SliderProperties> = function ({ images, className, direction }) {
//   const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   return (
//     <div className={`${className ?? ''} flex items-center justify-center`}>
//       {/* {direction === 'vertical' && images && (
//         <Swiper
//           onSwiper={setThumbsSwiper}
//           direction="vertical"
//           watchSlidesProgress
//           slidesPerView={images.length}
//           spaceBetween={10}
//           scrollbar={{ draggable: true }}
//           className="w-1/4 max-h-[36rem]"
//         >
//           {images.map((image, index) => (
//             <SwiperSlide key={image.url}>
//               <img
//                 src={image.url}
//                 alt={`Thumbnail ${index}`}
//                 className="object-cover w-28 h-auto rounded-xl"
//               />
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       )} */}

//       <div className="max-w-full max-h-[36rem]">
//         <Swiper
//           loop
//           direction={direction}
//           spaceBetween={30}
//           slidesPerView={1}
//           navigation
//           thumbs={{ swiper: thumbsSwiper }}
//           // onSwiper={(swiper) => setThumbsSwiper(swiper)}
//           className=""
//           // onClick={() => setIsModalOpen(true)}
//         >
//           {images?.map((image, index) => (
//             <SwiperSlide key={image.url} style={{ maxHeight: '100%' }}>
//               <img
//                 src={image.url}
//                 alt={`Slide ${index}`}
//                 className="w-auto max-h-[36rem] rounded-xl"
//               />
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>
//       <Modal active={isModalOpen} setActive={setIsModalOpen}>
//         <ImageSlider images={images} direction="horizontal" />
//       </Modal>
//     </div>
//   );
// };
