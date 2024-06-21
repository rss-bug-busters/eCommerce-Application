import { ProfileEditType } from '@components/Profile/ProfileForm/ProfileEdit.type';
import { ChangeEventHandler, FC, useEffect } from 'react';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';

interface CheckBoxProperties {
  checked: boolean;
  isEdit: boolean;
  label: string;
  name: keyof ProfileEditType;
  onChange: ChangeEventHandler<HTMLInputElement>;
  register: UseFormRegister<ProfileEditType>;
  setValue: UseFormSetValue<ProfileEditType>;
  value: string | undefined;
}

const CheckBox: FC<CheckBoxProperties> = function ({
  name,
  label,
  checked,
  isEdit = false,
  value = '',
  onChange,
  register,
  setValue,
}) {
  const inputId = `checkbox-${Math.random().toString(36).slice(2, 9)}`;

  useEffect(() => {
    if (checked) {
      setValue(name, value);
    }
  }, [checked, value, name, setValue]);

  return (
    <label
      htmlFor={inputId}
      className="relative mb-5 flex w-full cursor-pointer flex-row gap-1"
    >
      <input
        id={inputId}
        type="checkbox"
        value={value}
        {...register}
        className="peer sr-only"
        {...(checked ? { checked } : {})}
        {...(isEdit ? {} : { disabled: true })}
        onChange={onChange}
      />
      <div
        className={
          "peer h-5 w-9 rounded-full bg-gray-400 after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-700 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-200"
        }
      />
      {label}
    </label>
  );
};

export default CheckBox;
