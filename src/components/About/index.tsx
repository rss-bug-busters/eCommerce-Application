import { FC, useState } from 'react';
import TeamMembers from './TeamMembers/TeamMembers';
import Contribution from './Contribution/Contribution';
import Collaboration from './Collaboration/Collaboration';
import RsLogo from './RsLogo/RsLogo';

const About: FC = function () {
  const [isSelected, setIsSelected] = useState(true);

  return (
    <div className="mx-5 flex flex-col items-center justify-center gap-5">
      <h1 className="text-4xl font-bold text-gray-700 dark:text-white">About Us</h1>
      <div className="flex max-w-screen-2xl flex-col gap-5">
        <div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              className="btn btn-primary font-semibold"
              onClick={() => setIsSelected(true)}
              disabled={isSelected}
            >
              Contribution
            </button>
            <button
              type="button"
              className="btn btn-primary font-semibold"
              onClick={() => setIsSelected(false)}
              disabled={!isSelected}
            >
              Collaboration
            </button>
          </div>
          <div>{(isSelected && <Contribution />) || <Collaboration />}</div>
        </div>
        <TeamMembers />
        <RsLogo />
      </div>
    </div>
  );
};

export default About;
