import Catalog from '@components/Catalog/Catalog';
import Filter from '@components/Filter/Filter';
import { useState } from 'react';
import Search from '@components/Search/Search';

function MainPage() {
  const [searchValue, setSearchValue] = useState<string | undefined>();

  return (
    <div data-testid="main-page" className="grid">
      <Search className="mx-auto mb-5 sm:w-1/2" setSearch={setSearchValue} />
      <Filter />
      <Catalog search={searchValue} />
    </div>
  );
}

export default MainPage;
