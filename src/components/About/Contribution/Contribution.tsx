import { FC } from 'react';
import persons from '@utils/consts/persons';
import clsx from 'clsx';

const Contribution: FC = function () {
  return (
    <div className="mt-3 flex flex-col gap-3">
      <h3 className="text-2xl font-bold text-gray-700 dark:text-white">Contributions</h3>
      <div
        className={clsx(
          'flex w-full flex-wrap place-content-around gap-5 rounded-lg bg-slate-100 p-6',
          'shadow-[inset_0px_1px_52px_-20px_rgba(66,68,90,1)]',
          'dark:bg-zinc-900 dark:shadow-[inset_0px_1px_52px_-20px_rgba(223,222,221,1)]'
        )}
      >
        {persons.map((person) => (
          <div
            key={`person-contribution-${Math.random().toString(36).slice(2, 9)}`}
            className="component-box flex max-w-lg flex-col"
          >
            <img
              className=" square-full absolute h-10 w-10 rounded-lg ring-2 ring-white"
              src={person.photo}
              alt="avatar"
            />
            <p className="start flex pl-12 text-center text-xl font-bold">
              {person.name}
            </p>
            <ul className="mt-6 list-inside list-disc">
              {person.contributions.map((contribution) => (
                <li key={`contribution-${Math.random().toString(36).slice(2, 9)}`}>
                  {contribution}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contribution;
