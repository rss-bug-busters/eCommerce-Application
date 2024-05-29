import useCategory from '@hooks/useCategory';
import { useState } from 'react';
import createCategoryTree from '@components/Filter/utils/createCategoryTree';
import CategoryDropdown from '@components/Filter/CategoryDropdown';

function Filter() {
  const { data } = useCategory();
  const [category, setCategory] = useState<string | undefined>();

  console.log(category);

  return (
    <CategoryDropdown
      nodes={data?.body.results ? createCategoryTree(data.body.results) : []}
      selectCategory={setCategory}
    />
  );
}

export default Filter;
