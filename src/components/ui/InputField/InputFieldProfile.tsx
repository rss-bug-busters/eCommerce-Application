import { FC, useEffect, useState } from 'react';
import { FieldError, UseFormRegisterReturn, UseFormSetValue } from 'react-hook-form';
import Show from '@assets/svg/eye.svg?react';
import Hide from '@assets/svg/eye-close.svg?react';
import { ProfileEditType } from '@components/Profile/ProfileForm/ProfileEdit.type';

interface InputFieldProfileProperties {
  defaultValue?: string;
  error?: FieldError;
  isEdit?: boolean;
  isRequired?: boolean;
  name: keyof ProfileEditType;
  placeholder: string;
  register: UseFormRegisterReturn;
  setValue: UseFormSetValue<ProfileEditType>;
  type?: string;
  value?: string;
}

const InputFieldProfile: FC<InputFieldProfileProperties> = function ({
  name,
  register,
  placeholder,
  error,
  type = 'text',
  isRequired = true,
  isEdit = false,
  defaultValue,
  setValue,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const [useIsChanged, setIsChanged] = useState(false);

  useEffect(() => {
    if (defaultValue) {
      setValue(name, defaultValue);
      setIsChanged(false);
    }
  }, [defaultValue, name, setValue]);

  const isPassword = type === 'password';

  return (
    <div className="relative">
      <label htmlFor={name} className="flex items-center justify-start w-full ml-3">
        {placeholder}
      </label>
      <input
        {...register}
        defaultValue={defaultValue}
        placeholder={placeholder + (isRequired ? '*' : '')}
        type={isPassword && showPassword ? 'text' : type}
        className={`flex items-center justify-start w-60 h-12 p-3 pr-9 outline-none border bg-transparent rounded-full ${error ? 'border-red-600' : 'border-gray-300'} ${isEdit ? 'bg-slate-100' : 'bg-slate-300'}  ${useIsChanged ? 'border-orange-400' : 'border-gray-300'} `}
        onChange={(event) =>
          event.target.value === defaultValue ? setIsChanged(false) : setIsChanged(true)
        }
        {...(isEdit ? {} : { disabled: true })}
      />
      {isPassword && (
        <button
          type="button"
          className="absolute top-9 right-4"
          onClick={handleShowPassword}
        >
          {showPassword ? <Hide className="w-5 h-5" /> : <Show className="w-5 h-5" />}
        </button>
      )}
      <span
        data-testid={`error-${name}`}
        className="text-red-600 text-xs absolute top-15 ml-2 max-md:w-max"
      >
        {error?.message}
      </span>
    </div>
  );
};

export default InputFieldProfile;
