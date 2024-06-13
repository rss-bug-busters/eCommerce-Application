import { FC, useState } from 'react';
import TeamMembers from './TeamMembers/TeamMembers';
import Contribution from './Contribution/Contribution';
import Collaboration from './Collaboration/Collaboration';

const About: FC = function () {
  const [isSelected, setSelected] = useState(true);

  return (
    <div className="mx-5 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-gray-700 dark:text-white">About Us</h1>
      <div className="flex flex-col gap-5">
        {/* ---------------- */}
        <div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              className={`flex items-end  rounded-md ${isSelected ? 'bg-gray-600' : 'bg-gray-800'} px-4 py-2 text-center font-semibold text-white hover:bg-gray-600 dark:bg-zinc-600 dark:hover:bg-zinc-50`}
              onClick={() => setSelected(true)}
            >
              Contribution
            </button>
            <button
              type="button"
              className={`flex items-end  rounded-md ${isSelected ? 'bg-gray-800' : 'bg-gray-600'} px-4 py-2 text-center font-semibold text-white hover:bg-gray-600 dark:bg-zinc-600 dark:hover:bg-zinc-50`}
              onClick={() => setSelected(false)}
            >
              Collaboration
            </button>
          </div>
          <div>{(isSelected && <Contribution />) || <Collaboration />}</div>
        </div>
        {/* ===================================== */}
        <TeamMembers />
      </div>
    </div>
  );
};

export default About;
