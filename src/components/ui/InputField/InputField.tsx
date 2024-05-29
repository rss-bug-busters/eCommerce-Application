import { FC, useState } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import Show from '@assets/svg/eye.svg?react';
import Hide from '@assets/svg/eye-close.svg?react';

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
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const isPassword = type === 'password';

  return (
    <div className="relative">
      {/* <label htmlFor={name} className="flex items-center justify-start w-full">
        {placeholder}
      </label> */}
      <input
        {...register}
        placeholder={placeholder + (isRequired ? '*' : '')}
        type={isPassword && showPassword ? 'text' : type}
        className={`flex h-12 w-64 items-center justify-start rounded-full border bg-transparent p-3 pr-9 outline-none ${error ? 'border-red-600' : 'border-gray-300'}`}
      />
      {isPassword && (
        <button
          type="button"
          className="absolute right-4 top-4"
          onClick={handleShowPassword}
        >
          {showPassword ? <Hide className="h-5 w-5" /> : <Show className="h-5 w-5" />}
        </button>
      )}
      <span
        data-testid={`error-${name}`}
        className="absolute top-12 ml-2 text-xs text-red-600 max-md:w-max"
      >
        {error?.message}
      </span>
    </div>
  );
};

export default InputField;
