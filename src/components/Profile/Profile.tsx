import { FC, useEffect, useState } from 'react';
import useUserQueries from '@services/api/commercetools/hooks/useUserQueries';
import { Customer } from '@commercetools/platform-sdk';
import ModalProfile from '@components/ui/Modal/ModalProfile';
import { toast } from 'react-toastify';
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
        if (error instanceof Error) {
          toast.error(`Failed to fetch user data: ${error.message}`);
        }
      }
    };

    if (!userData) {
      (async () => {
        await fetchUserData();
      })().catch((error) => {
        if (error instanceof Error) {
          toast.error(`Failed to fetch user data: ${error.message}`);
        }
      });
    }
  }, [user, userData]);

  return (
    <div className="flex flex-col items-center justify-center gap-2 md:gap-5">
      <h1 className="text-4xl font-bold text-gray-700 dark:text-white">Profile</h1>
      <div className="mt-5 flex max-w-xl flex-row items-end justify-center gap-2">
        <button
          type="button"
          className="flex items-end  rounded-md bg-gray-800 px-4 py-2 text-center font-semibold text-white hover:bg-gray-600 dark:bg-zinc-600 dark:hover:bg-zinc-50"
          onClick={onEditProfile}
          data-testid="profile-page-edit-profile-button"
        >
          Edit Profile
        </button>
        <button
          type="button"
          className="flex items-end  rounded-md bg-gray-800 px-4 py-2 text-center font-semibold text-white hover:bg-gray-600 dark:bg-zinc-600 dark:hover:bg-zinc-50"
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
