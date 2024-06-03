import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

interface Properties {
  toggleName: string;
}

function Toggle({
  toggleName,
  className,
  ...rest
}: Properties &
  Omit<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    'type' | 'id'
  >) {
  return (
    <label
      className={`mb-5 inline-flex cursor-pointer items-center ${className}`}
      htmlFor="toggle"
    >
      <input id="toggle" type="checkbox" className="peer sr-only" {...rest} />
      <div className="peer relative h-5 w-9 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800" />
      <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
        {toggleName}
      </span>
    </label>
  );
}

export default Toggle;
