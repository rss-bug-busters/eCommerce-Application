import { FC } from 'react';
import { Link } from 'react-router-dom';
import persons, { Person } from '@utils/consts/persons';
import clsx from 'clsx';

interface MemberProperties {
  person: Person;
}

const Member: FC<MemberProperties> = function ({ person }) {
  return (
    <div className="component-box flex max-w-lg flex-col p-6">
      <img
        className=" square-full absolute h-20 w-20 rounded-lg ring-2 ring-white"
        src={person.photo}
        alt="avatar"
      />
      <p className="start flex pl-28 text-center text-xl font-bold">{person.name}</p>
      <p className="start flex pl-28 text-center text-zinc-600 dark:text-zinc-400">
        {person.role}
      </p>
      <Link
        to={person.gitHubLink}
        className="start relative mb-4 ml-28  flex max-w-fit gap-2 transition duration-300 before:absolute before:bottom-0 before:right-0 before:h-0.5 before:w-0 before:bg-[#000000] before:transition-[width] before:duration-[0.6s] before:ease-[cubic-bezier(0.25,1,0.5,1)] before:content-[''] hover:before:left-0 hover:before:right-auto hover:before:w-full"
      >
        <img
          className="h-5 w-5"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/600px-Octicons-mark-github.svg.png?20180806170715"
          alt="git-icon"
        />{' '}
        {person.gitHubName}
      </Link>
      <p className="text- mt-4 text-justify">{person.bio}</p>
    </div>
  );
};

const TeamMembers: FC = function () {
  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <h2 className="text-3xl font-bold text-gray-700 dark:text-white">Team Members</h2>
      <div
        className={clsx(
          'flex w-full flex-wrap place-content-around gap-5 rounded-lg bg-slate-100 p-6',
          'shadow-[inset_0px_1px_52px_-20px_rgba(66,68,90,1)]',
          'dark:bg-zinc-900 dark:shadow-[inset_0px_1px_52px_-20px_rgba(223,222,221,1)]'
        )}
      >
        {persons.map((person) => (
          <div key={`person-${Math.random().toString(36).slice(2, 9)}`}>
            <Member person={person} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamMembers;
