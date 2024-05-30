import { FC, useState } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import Show from '@assets/svg/eye.svg?react';
import Hide from '@assets/svg/eye-close.svg?react';

interface InputFieldProfileProperties {
  error?: FieldError;
  isRequired?: boolean;
  key?: string;
  name: string;
  placeholder: string;
  readOnly?: boolean;
  register: UseFormRegisterReturn;
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
  readOnly = true,
  value = '',
}) {
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const isPassword = type === 'password';

  return (
    <div className="relative">
      <label htmlFor={name} className="flex items-center justify-start w-full ml-3">
        {placeholder}
      </label>
      <input
        {...register}
        placeholder={placeholder + (isRequired ? '*' : '')}
        type={isPassword && showPassword ? 'text' : type}
        className={`flex items-center justify-start w-64 h-12 p-3 pr-9 outline-none border bg-transparent rounded-full ${error ? 'border-red-600' : 'border-gray-300'} ${readOnly ? 'bg-slate-300' : 'bg-slate-100'} `}
        readOnly={readOnly}
        value={value}
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
        className="text-red-600 text-xs absolute top-12 ml-2 max-md:w-max"
      >
        {error?.message}
      </span>
    </div>
  );
};

export default InputFieldProfile;
