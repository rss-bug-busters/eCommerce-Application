import { FC } from 'react';
import usePromoCodes from './getPromoCodes';

const PromoCodesBox: FC = function () {
  const promoCodes = usePromoCodes();

  console.log(promoCodes);

  return (
    <div>
      <h2>Promocodes</h2>
    </div>
  );
};

export default PromoCodesBox;
