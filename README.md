[![🧪 CI](https://github.com/rss-bug-busters/eCommerce-Application/actions/workflows/CI.yml/badge.svg)](https://github.com/rss-bug-busters/eCommerce-Application/actions/workflows/CI.yml)

# eCommerce Application

Welcome to our eCommerce application! This platform replicates real-world shopping experiences in a digital environment using modern web technologies 🏪. It's a comprehensive online shopping portal that provides an interactive and seamless experience to users. From product discovery to checkout, the application ensures a smooth journey for the user, enhancing their engagement and boosting their purchasing confidence 🚀.

Users can browse through a vast range of products 📚👗👟, view detailed descriptions, add their favorite items to the basket 🛒, and proceed to checkout 💳. It includes features such as user registration and login 📝🔐, product search 🔍, product categorization, and sorting to make the shopping experience more streamlined and convenient.

An important aspect of our application is that it's responsive 📲, ensuring it looks great on various devices with a minimum resolution of 390px. This feature makes the shopping experience enjoyable, irrespective of the device users prefer.

Key pages in the application include:

- Login and Registration pages 🖥️
- Main page 🏠
- Catalog Product page 📋
- Detailed Product page 🔎
- User Profile page 👤
- Basket page 🛒
- About Us page 🙋‍♂️🙋‍♀️

<p align="right">(<a href="#readme-top">back to top ⬆</a>)</p>

## Technology Stack

#### Frontend

- **React**: Utilized as the primary JavaScript library for building user interfaces, React offers a component-based architecture that facilitates the development of reusable UI components.
- **Redux Toolkit**: RTK Query, part of Redux Toolkit, is used for managing data fetching and caching, providing a powerful and efficient solution for handling API requests and managing global state.
- **React Router**: React Router is used for declarative routing in the application, enabling navigation between different views while maintaining a single-page architecture.
- **Vite**: Vite is used as the frontend build tool, providing fast and efficient development and production builds through its modern bundling and hot module replacement capabilities.
- **TypeScript**: TypeScript is employed to add static typing to JavaScript, enhancing code quality, and developer productivity by catching type-related errors during development.
- **Sass**: Sass is chosen as the CSS preprocessor for its powerful features like variables, mixins, and nesting, enabling better organization and maintainability of stylesheets.
- **ESLint, Stylelint, and Prettier**: ESLint ensures JavaScript code consistency and detects potential errors, Prettier enforces code formatting rules, and Stylelint is used for maintaining consistent styles in CSS, SCSS, and other stylesheets.
- **Husky and lint-staged**: These tools are integrated into the project to enforce code quality standards by running ESLint, Prettier, Stylelint, and other linting tools on staged files before commits. Additionally, tests are executed during pre-push to ensure code quality and reliability.

#### Backend
- **CommerceTools**: CommerceTools offers a cloud-native, microservices-based commerce platform that enables brands to create unique and engaging digital commerce experiences, so it serves as the backend solution for managing product data, user information, and transactions in our application.

#### Testing
- **Vitest**: Vitest is utilized for writing and executing tests, ensuring the reliability and correctness of the application's frontend components. Tests are also run during pre-push to maintain code quality standards.

<p align="right">(<a href="#readme-top">back to top ⬆</a>)</p>

## Getting Started

Follow these simple instructions to set up and run the project locally on your computer.

### Prerequisites

Make sure you have the following tools installed on your computer:
* **Node.js** (v20.12.2 or higher)
* **Yarn** (v4.1.1 or higher)

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/rss-bug-busters/eCommerce-Application.git
   ```
2. Go to the project directory and install dependencies
   ```zsh
   cd eCommerce-Application
   yarn
   ```
3. Start project
   ```zsh
   yarn dev
   ```
This will start the development server and your project will be available at the address specified in the console (e.g. http://localhost:3000/). It also activates Husky (a tool for managing git hooks).

<p align="right">(<a href="#readme-top">back to top ⬆</a>)</p>

### Additional commands

1. ```zsh
   yarn build
   ```
   This script is used to build the project in production mode. It first runs the *TypeScript Compiler (tsc)* to compile TypeScript files and then calls Vite to build the project.
   
2. ```zsh
   yarn preview
   ```
   This script is used to preview the built project before deployment. It starts a local server that displays the built project.
   
3. ```zsh
   yarn lint
   ```
   This script is used to check the code against **ESLint** rules. It checks files with extensions *.js, .jsx, .ts, .tsx, .cjs, .mjs* for compliance with rules and ignores files listed in *.gitignore*.

4. ```zsh
   yarn lint:write
   ```
   This script is similar to the lint script but also fixes any **ESLint** errors and warnings encountered using the *--fix* option.

5. ```zsh
   yarn stylelint
   ```
   This script is used to check styles against **Stylelint** rules. It checks style files with extensions *.css, .scss, .sass, .less, .styl, .vue, .svelte* for compliance with rules and ignores files listed in *.gitignore*.

6. ```zsh
   yarn stylelint:write
   ```
   This script is similar to the stylelint script but also fixes any errors and warnings encountered using the *--fix* option.

7. ```zsh
   yarn format
   ```
   This script is used to format code using **Prettier**. It formats all files in the project according to formatting rules and ignores files listed in *.gitignore*.

8. ```zsh
   yarn prepare
   ```
   This script is used to set up **Husky**. It is called when dependencies are installed and prepares *Husky* for use.

9. ```zsh
   yarn test
   ```
   This script is used to run project tests using *Vitest*.

0. ```zsh
   yarn test:staged
   ```
   This script is used to run tests only for changed *(staged)* files. It also uses *Vitest* to run tests.

<p align="right">(<a href="#readme-top">back to top ⬆</a>)</p>

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag **"enhancement"**.
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top ⬆</a>)</p>

## License

Distributed under the MIT License. See `LICENSE` for more information.

<p align="right">(<a href="#readme-top">back to top ⬆</a>)</p>


