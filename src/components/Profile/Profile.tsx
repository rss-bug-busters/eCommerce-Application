import { FC } from 'react';
import ProfileForm from './ProfileForm/ProfileForm';

const Profile: FC = function () {
  return (
    <div className="flex flex-col items-center justify-center gap-2 md:gap-5">
      <h1 className="text-4xl font-bold text-gray-700 dark:text-white">Profile</h1>
      <ProfileForm />
    </div>
  );
};

export default Profile;

// const getUserData = async () => {
//   const { user } = useUserQueries();

//   try {
//     const dataJson = await user().json();
//   } catch {}

//   console.log(dataJson);
// };

//
