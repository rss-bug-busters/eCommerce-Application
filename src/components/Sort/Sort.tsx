import { SyntheticEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import SortSVG from '@assets/svg/sort.svg?react';
import useSearchData from '@hooks/useSearchData';

function Sort() {
  const [searchParameters, setSearchParameters] = useSearchParams();
  const { sort } = useSearchData();

  const selectHandler = (event: SyntheticEvent<HTMLSelectElement, Event>) => {
    const { value } = event.target as HTMLInputElement;

    setSearchParameters({
      ...Object.fromEntries(searchParameters.entries()),
      sort: value,
    });
  };

  return (
    <div className="group flex w-fit max-w-sm  rounded-lg p-2 dark:bg-zinc-800 hover:dark:outline hover:dark:outline-zinc-700">
      <SortSVG className="h-6 w-6 text-gray-500 dark:text-gray-400 " />
      <select
        onChange={selectHandler}
        aria-label="select sort type"
        id="countries"
        className=" cursor-pointer rounded-lg dark:bg-zinc-800"
        value={sort ?? ''}
      >
        <option value="">Choose a sort type</option>
        <option value="priceAsk">price: ascending </option>
        <option value="priceDesk">price: descending</option>
        <option value="titleAsk">title: ascending</option>
        <option value="titleDesk">title: descending</option>
      </select>
    </div>
  );
}

export default Sort;
