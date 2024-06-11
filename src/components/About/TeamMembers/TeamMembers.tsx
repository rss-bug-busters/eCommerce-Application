import { FC } from 'react';
import { Link } from 'react-router-dom';
import persons, { Person } from './Persons/Persons';

interface MemberProperties {
  person: Person;
}

const Member: FC<MemberProperties> = function ({ person }) {
  return (
    <div className="max-w-2xl flex-col rounded-lg border-slate-500 bg-white p-6 shadow-lg">
      <img
        className=" square-full absolute h-20 w-20 rounded-lg ring-2 ring-white"
        src={person.photo}
        alt="avatar"
      />
      <p className="start flex pl-28 text-center text-xl font-bold">{person.name}</p>
      <p className="start flex pl-28 text-center text-gray-600">{person.role}</p>
      <Link to={person.gitHubLink} className="start mb-4 flex gap-2 pl-28 ">
        <img
          className="h-5 w-5"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/600px-Octicons-mark-github.svg.png?20180806170715"
          alt="git-icon"
        />
        {person.gitHubName}
      </Link>
      <div className="start mb-5 flex pl-28">
        {' '}
        <link rel="stylesheet" href={person.gitHubLink} />
      </div>
      <p className="mt-4 text-center">{person.bio}</p>
    </div>
  );
};

const TeamMembers: FC = function () {
  return (
    <>
      <h2>Team Members</h2>
      <div className=" flex gap-5 rounded-lg bg-slate-200 p-6  shadow-2xl">
        {persons.map((person) => (
          <div key={`person-${Math.random().toString(36).slice(2, 9)}`}>
            <Member person={person} />
          </div>
        ))}
      </div>
    </>
  );
};

export default TeamMembers;
