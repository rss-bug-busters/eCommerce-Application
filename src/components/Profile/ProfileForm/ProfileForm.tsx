import { zodResolver } from '@hookform/resolvers/zod';
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import InputFieldProfile from '@components/ui/InputField/InputFieldProfile';
import { Address, Customer } from '@commercetools/platform-sdk';
import useUserQueries from '@services/api/hooks/useUserQueries';
import { toast } from 'react-toastify';
import ProfileAddress from '../ProfileAdress/ProfileAddresses';
import { ProfileEditSchema, ProfileEditType } from './ProfileEdit.type';
import checkChangesProfile from '../ProfileCheckChanges/ProfileCheckChanges';

interface ProfileFormProperties {
  isEdit: boolean;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  setUserData: React.Dispatch<React.SetStateAction<Customer | undefined>>;
  userData: Customer | undefined;
}

const ProfileForm: FC<ProfileFormProperties> = function ({
  isEdit = false,
  userData,
  setEditMode,
  setUserData,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ProfileEditType>({
    resolver: zodResolver(ProfileEditSchema),
  });

  const emptyAddress: Address = {
    country: '',
    city: '',
    streetName: '',
    postalCode: '',
    key: `newAddress-${Math.random().toString(36).slice(2, 9)}`,
    id: `newAddress-${Math.random().toString(36).slice(2, 9)}`,
  };

  const { addActions } = useUserQueries();
  const [useAddresses, setAddresses] = useState(userData?.addresses ?? []);

  useEffect(() => {
    setAddresses(userData?.addresses ?? []);
  }, [userData?.addresses]);

  const onSubmit = async (data: ProfileEditType) => {
    toast.dismiss();

    if (userData) {
      const actions = checkChangesProfile(userData, data);
      const profileChanges = actions[0];
      const defualtChanges = actions[1];
      const addifDeleteDefualt =
        profileChanges?.reduce((acum, value) => {
          if (value.action === 'removeAddress') {
            return acum + 2;
          }

          return acum;
        }, 0) ?? 0;
      const profileChangesLength = (profileChanges?.length ?? 0) + addifDeleteDefualt;

      if (profileChanges) {
        await addActions(userData.version, profileChanges)
          .then((response) => {
            toast.success('Profile changes has been saved');
            setEditMode(false);
            setUserData(undefined);

            return response;
          })
          .catch((error) => {
            toast.error(`Failed: ${error}`);
          });
      }

      if (defualtChanges && defualtChanges.length > 0) {
        await addActions(userData.version + profileChangesLength, defualtChanges)
          .then((response) => {
            // toast.success('Profile changes has been saved');
            setEditMode(false);
            setUserData(undefined);

            return response;
          })
          .catch((error) => {
            toast.error(`Failed: ${error}`);
          });
      }
    }
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="m-auto flex max-w-xl flex-col items-center gap-3 rounded-xl border border-gray-200 p-5 md:gap-6 dark:bg-zinc-800"
    >
      <div className="flex items-center gap-x-2">
        <h2 className="text-center text-xl dark:text-white">Profile Information</h2>
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-8">
        <InputFieldProfile
          name="name"
          register={register('name')}
          placeholder="Name"
          error={errors.name}
          isEdit={isEdit}
          defaultValue={userData?.firstName}
          setValue={setValue}
        />
        <InputFieldProfile
          name="surname"
          register={register('surname')}
          placeholder="Surname"
          error={errors.surname}
          isEdit={isEdit}
          defaultValue={userData?.lastName}
          setValue={setValue}
        />
        <InputFieldProfile
          name="dateOfBirth"
          register={register('dateOfBirth')}
          placeholder="Date of birth"
          error={errors.dateOfBirth}
          type="date"
          isEdit={isEdit}
          defaultValue={userData?.dateOfBirth}
          setValue={setValue}
        />
        <InputFieldProfile
          name="email"
          register={register('email')}
          placeholder="Email"
          error={errors.email}
          isEdit={isEdit}
          type="text"
          defaultValue={userData?.email}
          setValue={setValue}
        />
      </div>
      <div className="flex items-center gap-x-2">
        <h2 className="text-center text-xl dark:text-white">Addresses</h2>
      </div>
      <ProfileAddress
        userData={userData}
        errors={errors}
        register={register}
        isEdit={isEdit}
        setValue={setValue}
        addresses={useAddresses}
        setAddresses={setAddresses}
      />
      {isEdit && (
        <button
          type="button"
          className="flex items-end rounded-md bg-gray-800 px-4 py-2 text-white"
          onClick={() => {
            if (useAddresses) {
              setAddresses([...useAddresses, emptyAddress]);
            }
          }}
        >
          Add Address
        </button>
      )}
      {isEdit && (
        <button
          type="submit"
          className="mt-4 flex min-w-72 items-center justify-center rounded-full bg-gray-800 px-6 py-4 text-center font-semibold text-white hover:bg-gray-600 dark:bg-zinc-600 dark:hover:bg-zinc-500"
          data-testid="profile-page-edit-profile-submit-button"
        >
          Save Changes
        </button>
      )}
    </form>
  );
};

export default ProfileForm;
