import { FC } from 'react';
import { Link } from 'react-router-dom';
import persons, { Person } from '../Persons/Persons';

interface MemberProperties {
  person: Person;
}

const Member: FC<MemberProperties> = function ({ person }) {
  return (
    <div className="w max-w-lg flex-col rounded-lg border-slate-500 bg-white p-6 shadow-lg">
      <img
        className=" square-full absolute h-20 w-20 rounded-lg ring-2 ring-white"
        src={person.photo}
        alt="avatar"
      />
      <p className="start flex pl-28 text-center text-xl font-bold">{person.name}</p>
      <p className="start flex pl-28 text-center text-gray-600">{person.role}</p>
      <Link
        to={person.gitHubLink}
        className="start group mb-4 flex max-w-fit  gap-2 pl-28 transition duration-300"
      >
        <img
          className="h-5 w-5"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/600px-Octicons-mark-github.svg.png?20180806170715"
          alt="git-icon"
        />{' '}
        <span className="block h-0.5 max-w-0 bg-black transition-all duration-500 group-hover:max-w-full">
          {person.gitHubName}
        </span>
      </Link>
      <p className="mt-4 text-center">{person.bio}</p>
    </div>
  );
};

const TeamMembers: FC = function () {
  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <h2 className="text-3xl font-bold text-gray-700 dark:text-white">Team Members</h2>
      <div className=" flex flex-wrap place-content-around gap-5 rounded-lg bg-slate-100 p-6  shadow-inner  ">
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
