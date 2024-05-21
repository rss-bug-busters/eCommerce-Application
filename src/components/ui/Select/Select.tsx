import { FC } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

interface SelectProperties {
  error?: FieldError;
  name: string;
  options: { label: string; value: string }[];
  placeholder?: string;
  register: UseFormRegisterReturn;
}

const Select: FC<SelectProperties> = function ({
  name,
  options,
  register,
  error,
  placeholder,
}) {
  return (
    <div className="relative">
      <select
        {...register}
        className={`flex items-center justify-start w-64 h-12 px-4 py-3 border bg-transparent rounded-full ${error ? 'border-red-600' : 'border-gray-300'}`}
        defaultValue=""
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

export default Select;
