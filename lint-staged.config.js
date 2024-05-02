const config = {
  '**/*.{js,jsx,ts,tsx,cjs,mjs}': (filenames) => `eslint ${filenames.join(' ')} --fix --ignore-path .gitignore`,
  '**/*.{json, html, yml, md}': (filenames) => `prettier ${filenames.join(' ')} --write --ignore-path .gitignore`,
  '**/*.{css,scss,sass,less,styl,vue,svelte}': (filenames) => `stylelint ${filenames.join(' ')} --fix --ignore-path .gitignore`,
};

export default config;
