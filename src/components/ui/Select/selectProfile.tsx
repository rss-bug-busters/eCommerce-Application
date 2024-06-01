import { FC } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

interface SelectProfileProperties {
  defaultValue: string;
  error?: FieldError;
  isEdit: boolean;
  name: string;
  options: { label: string; value: string }[];
  placeholder?: string;
  register: UseFormRegisterReturn;
}

const SelectProfile: FC<SelectProfileProperties> = function ({
  name,
  options,
  register,
  error,
  placeholder,
  defaultValue,
  isEdit = false,
}) {
  return (
    <div className="relative">
      <label htmlFor={name} className="flex items-center justify-start w-full ml-3">
        {placeholder}
      </label>
      <select
        defaultValue={defaultValue}
        {...register}
        className={`flex items-center justify-start w-60 h-12 px-4 py-3 border bg-transparent rounded-full ${error ? 'border-red-600' : 'border-gray-300'} ${isEdit ? 'bg-slate-100' : 'bg-slate-200'} `}
        // defaultValue=""
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
          className="text-red-600 text-xs absolute top-12 ml-2"
        >
          {error.message}
        </div>
      )}
    </div>
  );
};

export default SelectProfile;
