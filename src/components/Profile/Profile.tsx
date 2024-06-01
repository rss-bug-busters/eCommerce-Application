import { FC, useState } from 'react';
import ProfileForm from './ProfileForm/ProfileForm';

const Profile: FC = function () {
  const [editProfile, setEditProfile] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  const onEditProfile = () => {
    setEditProfile(!editProfile);
  };
  const onEditEmail = () => {
    setEditEmail(!editEmail);
  };
  const onEditPassword = () => {
    setEditPassword(!editPassword);
  };

  console.log(editProfile);

  return (
    <div className="flex flex-col items-center justify-center gap-2 md:gap-5">
      <h1 className="text-4xl font-bold text-gray-700 dark:text-white">Profile</h1>
      <div className="flex flex-row items-end justify-center max-w-xl gap-2 mt-5">
        <button
          type="button"
          className="flex items-end bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={onEditProfile}
        >
          Edit Profile
        </button>
        <button
          type="button"
          className="flex items-end bg-yellow-500 text-white px-4 py-2 rounded-md"
          onClick={onEditEmail}
        >
          Edit Email
        </button>
        <button
          type="button"
          className="flex items-end bg-red-500 text-white px-4 py-2 rounded-md"
          onClick={onEditPassword}
        >
          Edit Password
        </button>
      </div>
      <ProfileForm isEdit={editProfile} />
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
