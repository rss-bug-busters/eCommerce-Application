import { zodResolver } from '@hookform/resolvers/zod';
// import useSignUpMutation from '@services/api/hooks/useSignUpMutation';
// import { useQueryClient } from '@tanstack/react-query';
// import RoutePaths from '@utils/consts/RoutePaths';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import Spinner from '@assets/svg/spinner.svg?react';
import InputFieldProfile from '@components/ui/InputField/InputFieldProfile';
import { Address, Customer } from '@commercetools/platform-sdk';
// import useUserQueries from '@services/api/hooks/useUserQueries';
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
    // control,
    setValue,
  } = useForm<ProfileEditType>({
    resolver: zodResolver(ProfileEditSchema),
  });

  // console.log('Validation errors:', errors);

  // const client = useQueryClient();
  // const navigate = useNavigate();
  // const [useSameAddress, setUseSameAddress] = useState(true);
  // const [useAsDefaultShipping, setUseAsDefaultShipping] = useState(true);
  // const [useAsDefaultBilling, setUseAsDefaultBilling] = useState(true);
  // const shipping = useWatch({
  //   control,
  //   name: 'shippingAddress',
  // });

  // const handleUseSameAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setUseSameAddress(event.target.checked);

  //   if (event.target.checked) {
  //     setValue('billingAddress', shipping);
  //     setValue('isDefaultBilling', useAsDefaultShipping);
  //   }
  // };
  // const handleSetDefault = () => {
  //   if (useSameAddress) {
  //     setUseAsDefaultBilling(!useAsDefaultShipping);
  //   }

  //   setUseAsDefaultShipping(!useAsDefaultShipping);
  // };

  // const { mutate: signUpMutation, isPending } = useSignUpMutation();

  // const onSubmit:= async (data) => {
  //   toast.dismiss();
  //   signUpMutation(data, {
  //     async onSuccess() {
  //       toast.success('Account created successfully!');
  //       await client.resetQueries();
  //       navigate(RoutePaths.MAIN);
  //     },
  //     onError(error) {
  //       toast.error(`Failed: ${error.message}`);
  //     },
  //   });
  // };

  // useEffect(() => {
  //   if (useSameAddress) {
  //     setValue('billingAddress', shipping);
  //   }
  // }, [setValue, shipping, useSameAddress]);
  const emptyAddress: Address = {
    country: '',
    city: '',
    streetName: '',
    postalCode: '',
  };

  const { addActions } = useUserQueries();

  const onSubmit = (data: ProfileEditType) => {
    toast.dismiss();

    if (userData) {
      const actions = checkChangesProfile(userData, data);

      addActions(userData.version, actions)
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
    // const actions: MyCustomerUpdateAction[] = [{
    //   action: 'setFirstName',
    //   firstName: "John"

    // },{
    //   action: 'changeAddress',
    //   addressId: 'asdaqdwdx'
    //   address: 'asdasd'
    // }]
    // Actions.changeAddress={action firstName: 'Tod'}
    // addActions(2,actions).then((response)=>{
    //   console.log(response)
    // }).catch((error)=> {
    //   console.log(error)
    // })
    // Place your form submission logic here
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col p-5 items-center gap-3 md:gap-6 max-w-xl dark:bg-zinc-800 border border-gray-200 rounded-xl m-auto"
    >
      <div className="flex items-center gap-x-2">
        <h2 className="text-xl text-center dark:text-white">Profile Information</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
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
        {/* <InputFieldProfile
          name="email"
          register={register('email')}
          placeholder="Email"
          error={errors.email}
          type="text"
          readOnly
          value={userData?.email}
        /> */}
        {/* <InputFieldProfile
          name="password"
          register={register('password')}
          placeholder="Password"
          error={errors.password}
          type="password"
          readonly={true}
          value={userData?.password}
        />
        <InputFieldProfile
          name="confirmPassword"
          register={register('confirmPassword')}
          placeholder="Confirm password"
          error={errors.confirmPassword}
          type="password"
          readonly={true}
          value={userData?.password}
        /> */}
      </div>
      <div className="flex items-center gap-x-2">
        <h2 className="text-xl text-center dark:text-white">Addresses</h2>
      </div>
      <ProfileAddress
        userData={userData}
        errors={errors}
        register={register}
        isEdit={isEdit}
        setValue={setValue}
      />
      {isEdit && (
        <button
          type="button"
          className="flex items-end bg-gray-800 text-white px-4 py-2 rounded-md"
          onClick={() => {
            if (userData) {
              const updatedUserData = {
                ...userData,
              };

              if (updatedUserData.addresses) {
                updatedUserData.addresses.push(emptyAddress);
              }

              setUserData(updatedUserData);
            }
          }}
        >
          Add Address
        </button>
      )}
      {isEdit && (
        <button
          type="submit"
          className="flex items-center justify-center min-w-72 mt-4 px-6 py-4 bg-gray-800 hover:bg-gray-600 rounded-full font-semibold text-center text-white dark:bg-zinc-600 dark:hover:bg-zinc-500"
        >
          {/* {isPending && <Spinner className="w-6 h-6 mr-4 animate-spin" />} */}
          Save Changes
        </button>
      )}
    </form>
  );
};

export default ProfileForm;
