import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { Customer } from '@commercetools/platform-sdk';
import useUserQueries from '@services/api/hooks/useUserQueries';
import { toast } from 'react-toastify';
import InputFieldPassword from './inputFieldPassword';
import { PasswordFormType, PasswordSchema } from './Password.types';

interface ProfileFormProperties {
  isEdit: boolean;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  setUserData: React.Dispatch<React.SetStateAction<Customer | undefined>>;
  userData: Customer | undefined;
}

const ProfileFormPassword: FC<ProfileFormProperties> = function ({
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
  } = useForm<PasswordFormType>({
    resolver: zodResolver(PasswordSchema),
  });

  const { changePassword } = useUserQueries();

  const onSubmit = (data: PasswordFormType) => {
    toast.dismiss();

    if (userData) {
      changePassword(
        userData.version,
        data.currentPassword,
        data.newPassword,
        userData.email
      )
        .then((response) => {
          toast.success('Password changes has been saved');
          setEditMode(false);
          setUserData(undefined);

          return response;
        })
        .catch((error) => {
          toast.error(`Failed: ${error}`);
        });
    }
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col p-5 items-center gap-3 md:gap-6 max-w-xl dark:bg-zinc-800 border border-gray-200 rounded-xl m-auto"
    >
      <div className="flex items-center gap-x-2">
        <h2 className="text-xl text-center dark:text-white">Password change</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
        <InputFieldPassword
          name="currentPassword"
          register={register('currentPassword')}
          placeholder="Current Password"
          error={errors.currentPassword}
          isEdit={isEdit}
          type="password"
          defaultValue=""
          setValue={setValue}
        />
        <InputFieldPassword
          name="newPassword"
          register={register('newPassword')}
          placeholder="New Password"
          error={errors.newPassword}
          isEdit={isEdit}
          type="password"
          defaultValue=""
          setValue={setValue}
        />
      </div>

      {isEdit && (
        <button
          type="submit"
          className="flex items-center justify-center min-w-72 mt-4 px-6 py-4 bg-gray-800 hover:bg-gray-600 rounded-full font-semibold text-center text-white dark:bg-zinc-600 dark:hover:bg-zinc-500"
        >
          Save Changes
        </button>
      )}
    </form>
  );
};

export default ProfileFormPassword;
