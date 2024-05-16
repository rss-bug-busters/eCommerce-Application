import { FC } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

interface InputFieldProperties {
  error?: FieldError;
  name: string;
  placeholder: string;
  register: UseFormRegisterReturn;
  type?: string;
}

const InputField: FC<InputFieldProperties> = function ({
  name,
  register,
  placeholder,
  error,
  type = 'text',
}) {
  return (
    <div>
      {/* <label htmlFor={name} className="flex items-center justify-start w-full">
        {placeholder}
      </label> */}
      <input
        {...register}
        placeholder={placeholder}
        type={type}
        className="flex items-center justify-start w-64 h-12 px-4 py-3 border bg-transparent rounded-full border-gray-200"
      />
      <div data-testid={`error-${name}`}>{error?.message}</div>
    </div>
  );
};

export default InputField;
