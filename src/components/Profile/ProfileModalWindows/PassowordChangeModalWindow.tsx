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
      className="m-auto flex max-w-xl flex-col items-center gap-3 rounded-xl border border-gray-200 p-5 md:gap-6 dark:bg-zinc-800"
    >
      <div className="flex items-center gap-x-2">
        <h2 className="text-center text-xl dark:text-white">Password change</h2>
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-8">
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
          className="mt-4 flex min-w-72 items-center justify-center rounded-full bg-gray-800 px-6 py-4 text-center font-semibold text-white hover:bg-gray-600 dark:bg-zinc-600 dark:hover:bg-zinc-500"
        >
          Save Changes
        </button>
      )}
    </form>
  );
};

export default ProfileFormPassword;
