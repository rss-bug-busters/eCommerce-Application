import Search from '@components/Search/Search';
import Catalog from '@components/Catalog/Catalog';
import Filter from '@components/Filter/Filter';

function MainPage() {
  return (
    <div data-testid="main-page" className="grid">
      <Search />
      <Catalog />
      <Filter />
    </div>
  );
}

export default MainPage;
