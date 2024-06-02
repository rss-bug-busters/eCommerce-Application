import { FC, useEffect, useState } from 'react';
import useUserQueries from '@services/api/hooks/useUserQueries';
import { Customer } from '@commercetools/platform-sdk';
import ModalProfile from '@components/ui/Modal/ModalProfile';
import ProfileForm from './ProfileForm/ProfileForm';
import ProfileFormPassword from './ProfileModalWindows/PassowordChangeModalWindow';

const Profile: FC = function () {
  const [useEditProfile, setEditProfile] = useState(false);
  const [useEditPassword, setEditPassword] = useState(false);
  const [userData, setUserData] = useState<Customer | undefined>();
  const { user } = useUserQueries();

  const onEditProfile = () => {
    setEditProfile(!useEditProfile);
    setUserData(undefined);
  };
  const onEditPassword = () => {
    setEditPassword(!useEditPassword);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await user();

        setUserData(response.body);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (!userData) {
      (async () => {
        await fetchUserData();
      })().catch((error) => console.error('Failed to fetch user data:', error));
    }
  }, [user, userData]);

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
          className="flex items-end bg-red-500 text-white px-4 py-2 rounded-md"
          onClick={onEditPassword}
        >
          Edit Password
        </button>
      </div>
      <ProfileForm
        isEdit={useEditProfile}
        userData={userData}
        setEditMode={setEditProfile}
        setUserData={setUserData}
      />
      <ModalProfile active={useEditPassword} setActive={setEditPassword}>
        {' '}
        <ProfileFormPassword
          isEdit={useEditPassword}
          userData={userData}
          setEditMode={setEditPassword}
          setUserData={setUserData}
        />
      </ModalProfile>
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
