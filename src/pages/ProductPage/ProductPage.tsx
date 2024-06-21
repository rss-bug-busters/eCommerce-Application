import { useProductDetails } from '@hooks/product';
import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ImageSlider from '@components/ImageSlider/ImageSlider';
import Details from '@components/ProductInfo/Details';

const ProductPage: FC = function () {
  const { id } = useParams();
  const { data, isSuccess } = useProductDetails({ ID: id ?? '' });
  const { images } = data?.body.masterVariant ?? {};

  const [direction, setDirection] = useState<'horizontal' | 'vertical'>('vertical');

  useEffect(() => {
    const updateDirection = () => {
      if (window.innerWidth > 1024) {
        setDirection('vertical');
      } else {
        setDirection('horizontal');
      }
    };

    updateDirection();
    window.addEventListener('resize', updateDirection);

    return () => {
      window.removeEventListener('resize', updateDirection);
    };
  }, []);

  return (
    <div
      data-testid="product-page"
      className="grid-cols-12 items-start gap-10 px-4 md:px-10 lg:grid"
    >
      {isSuccess && (
        <>
          <ImageSlider
            images={images}
            className="top-20 col-span-7 my-5 lg:sticky"
            direction={direction}
          />
          <Details product={data.body} className="col-span-5 md:mx-10 lg:mx-1" />
        </>
      )}
    </div>
  );
};

export default ProductPage;
