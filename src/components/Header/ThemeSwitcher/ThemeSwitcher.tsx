import { useEffect, useState } from 'react';
import SunIcon from '@assets/svg/sun.svg?react';
import MoonIcon from '@assets/svg/moon.svg?react';
import Theme from '@utils/consts/theme';
import clsx from 'clsx';

const ThemeSwitcher = function () {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === Theme.DARK || savedTheme === Theme.LIGHT) {
      return savedTheme;
    }

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return Theme.DARK;
    }

    return Theme.LIGHT;
  });

  useEffect(() => {
    const root = document.documentElement;

    if (theme === Theme.DARK) {
      root.classList.add(Theme.DARK);
    } else {
      root.classList.remove(Theme.DARK);
    }

    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((previousTheme) =>
      previousTheme === Theme.DARK ? Theme.LIGHT : Theme.DARK
    );
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="h-10 w-10 rounded-full bg-zinc-300 p-2 dark:bg-zinc-700"
    >
      <SunIcon
        className={clsx('text-yellow-600 transition-all duration-500', {
          'h-0 w-0 opacity-0': theme === Theme.LIGHT,
          'h-6 w-6': theme === Theme.DARK,
        })}
      />

      <MoonIcon
        className={clsx('text-clue-700 transition-all duration-500', {
          'h-0 w-0 opacity-0': theme === Theme.DARK,
          'h-6 w-6': theme === Theme.LIGHT,
        })}
      />

      <span className="sr-only">Theme</span>
    </button>
  );
};

export default ThemeSwitcher;
