import useProductDetails from '@hooks/useProductDetails';
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
      className="lg:grid grid-cols-12 items-start gap-10 p-10"
    >
      {isSuccess && (
        <>
          <ImageSlider
            images={images}
            className="lg:sticky top-20 col-span-7 my-5"
            direction={direction}
          />
          <Details product={data.body} className="col-span-5" />
        </>
      )}
    </div>
  );
};

export default ProductPage;
