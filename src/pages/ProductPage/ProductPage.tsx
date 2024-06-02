import useProductDetails from '@hooks/useProductDetails';
import { FC } from 'react';
import { useParams } from 'react-router-dom';
import ImageSlider from '@components/ImageSlider/ImageSlider';
import Details from '@components/ProductInfo/Details';

const ProductPage: FC = function () {
  const { id } = useParams();
  const { data, isSuccess } = useProductDetails({ ID: id ?? '' });
  const { images } = data?.body.masterVariant ?? {};

  return (
    <div data-testid="product-page" className="grid grid-cols-2 items-start gap-10 p-10">
      {isSuccess && (
        <>
          <ImageSlider images={images} className="sticky top-20" />
          <Details product={data.body} />
        </>
      )}
    </div>
  );
};

export default ProductPage;
