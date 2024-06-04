import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

function NumberInput({
  className,
  ...rest
}: Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'type'
>) {
  return (
    <input
      type="number"
      className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-zinc-800 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500${className}`}
      {...rest}
    />
  );
}

export default NumberInput;
