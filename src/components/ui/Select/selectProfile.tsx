import { ProfileEditType } from '@components/Profile/ProfileForm/ProfileEdit.type';
import { FC, useEffect, useState } from 'react';
import { FieldError, UseFormRegisterReturn, UseFormSetValue } from 'react-hook-form';

interface SelectProfileProperties {
  defaultValue: string;
  error?: FieldError;
  isEdit: boolean;
  name: keyof ProfileEditType;
  options: { label: string; value: string }[];
  placeholder?: string;
  register: UseFormRegisterReturn;
  setValue: UseFormSetValue<ProfileEditType>;
}

const SelectProfile: FC<SelectProfileProperties> = function ({
  name,
  options,
  register,
  error,
  placeholder,
  defaultValue,
  isEdit = false,
  setValue,
}) {
  const [useIsChanged, setIsChanged] = useState(false);

  useEffect(() => {
    if (defaultValue) {
      setValue(name, defaultValue);
      setIsChanged(false);
    }
  }, [defaultValue, name, setValue]);

  return (
    <div className="relative">
      <label htmlFor={name} className="ml-3 flex w-full items-center justify-start">
        {placeholder}
      </label>
      <select
        defaultValue={defaultValue}
        {...register}
        className={`flex h-12 w-60 items-center justify-start rounded-full border bg-transparent px-4 py-3 ${error ? 'border-red-600' : 'border-gray-300'} ${isEdit ? 'bg-slate-100' : 'bg-slate-400'} ${useIsChanged ? 'border-orange-400' : 'border-gray-300'} `}
        onChange={(event) =>
          event.target.value === defaultValue ? setIsChanged(false) : setIsChanged(true)
        }
        {...(isEdit ? {} : { disabled: true })}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <div
          data-testid={`error-${name}`}
          className="top-15 absolute ml-2 text-xs text-red-600"
        >
          {error.message}
        </div>
      )}
    </div>
  );
};

export default SelectProfile;
