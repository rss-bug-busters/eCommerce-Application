const config = {
  '**/*.{js,jsx,ts,tsx,cjs,mjs}': (filenames) => `eslint ${filenames.join(' ')} --ignore-path .gitignore`,
  '**/*.{json,html,yml,md}': (filenames) => `prettier ${filenames.join(' ')} --ignore-path .gitignore`,
  '**/*.{css,scss,sass,less,styl,vue,svelte}': (filenames) => `stylelint ${filenames.join(' ')} --ignore-path .gitignore`,
};

export default config;
