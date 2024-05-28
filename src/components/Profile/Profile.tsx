import { FC } from 'react';
import useUserQueries from '@services/api/hooks/useUserQueries';

const Profile: FC = function () {
  const { user } = useUserQueries();

  console.log(user());

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <button
        type="button"
        className="flex items-center justify-center min-w-72 px-6 py-4 bg-gray-800 rounded-full font-semibold text-center text-white dark:bg-zinc-600 dark:hover:bg-zinc-500"
        onClick={async () => console.log(user())}
      >
        TEST
      </button>
    </div>
  );
};

// const getUserData = async () => {
//   const { user } = useUserQueries();

//   try {
//     const dataJson = await user().json();
//   } catch {}

//   console.log(dataJson);
// };

export default Profile;
