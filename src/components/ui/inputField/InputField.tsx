import { FC } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

interface InputFieldProperties {
  error?: FieldError;
  isRequired?: boolean;
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
  isRequired = true,
}) {
  return (
    <div className="relative">
      {/* <label htmlFor={name} className="flex items-center justify-start w-full">
        {placeholder}
      </label> */}
      <input
        {...register}
        placeholder={placeholder + (isRequired ? '*' : '')}
        type={type}
        className={`flex items-center justify-start w-64 h-12 px-4 py-3 border bg-transparent rounded-full ${error ? 'border-red-600' : 'border-gray-300'}`}
      />
      <span
        data-testid={`error-${name}`}
        className="text-red-600 text-xs absolute top-12 ml-2"
      >
        {error?.message}
      </span>
    </div>
  );
};

export default InputField;
