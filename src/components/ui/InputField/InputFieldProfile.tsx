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
      <label htmlFor={name} className="ml-3 flex w-full items-center justify-start">
        {placeholder}
      </label>
      <input
        {...register}
        defaultValue={defaultValue}
        placeholder={placeholder + (isRequired ? '*' : '')}
        type={isPassword && showPassword ? 'text' : type}
        className={`flex h-12 w-60 items-center justify-start rounded-full border bg-transparent p-3 pr-9 outline-none ${error ? 'border-red-600' : 'border-gray-300'} ${isEdit ? 'bg-slate-100' : 'bg-slate-400'}  ${useIsChanged ? 'border-orange-400' : 'border-gray-300'} `}
        onChange={(event) =>
          event.target.value === defaultValue ? setIsChanged(false) : setIsChanged(true)
        }
        {...(isEdit ? {} : { disabled: true })}
      />
      {isPassword && (
        <button
          type="button"
          className="absolute right-4 top-9"
          onClick={handleShowPassword}
        >
          {showPassword ? <Hide className="h-5 w-5" /> : <Show className="h-5 w-5" />}
        </button>
      )}
      <span
        data-testid={`error-${name}`}
        className="top-15 absolute ml-2 text-xs text-red-600 max-md:w-max"
      >
        {error?.message}
      </span>
    </div>
  );
};

export default InputFieldProfile;
