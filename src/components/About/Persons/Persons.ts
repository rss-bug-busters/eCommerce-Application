export interface Person {
  bio: string;
  contributions: string[];
  gitHubLink: string;
  gitHubName: string;
  name: string;
  photo: string;
  role: string;
}

const persons: Person[] = [];
const RemAntof: Person = {
  name: 'Anton Ramarchuk',
  role: 'Noobie',
  bio: `
    Born in Belarus, 
    I moved to Poland at the age of 17 to pursue my education. 
    I graduated from the Warsaw University of Technology and currently work as a data analyst at a building company. 
    With a strong passion for technology and web development, 
    I am now looking forward to securing my first job offer as a frontend developer.
  `,
  gitHubLink: 'https://github.com/RemAntof',
  gitHubName: 'RemAntof',
  photo:
    'https://avatars.githubusercontent.com/u/87061061?s=400&u=1518b90e04897ccae793ea9971f86be510e5d681&v=4',
  contributions: [
    'About-us page implementation 📄',
    'Promo Codes implementation 📦',
    'Task Board Setup 📋',
    'Login Page Implementation 🖥️',
    'User Profile Page Implementation 👥',
    'Creating products on commercetools 🛒',
  ],
};
const FYMG: Person = {
  name: 'Artem',
  role: 'Brain',
  bio: `
    Artem is a seasoned Python backend developer and data engineer. 
    His contributions have been pivotalin connecting to the commercetools api, 
    setting up the project and repository.
  `,
  gitHubLink: 'https://github.com/FYMG',
  gitHubName: 'FYMG',
  photo: 'https://avatars.githubusercontent.com/u/34478249?v=4',
  contributions: [
    'Development Environment Configuration ⚙️',
    'API Client Setup 💻',
    'Repository Setup 🧐',
    'Set up CI/CD pipeline 🚀',
    'Routing Implementation 🚦',
    'Catalog Page Implementation 📚',
  ],
};
const Unforgettable: Person = {
  name: 'Tony Davydchyk',
  role: 'Team Lead',
  bio: `
    I am 23 years old. 
    Highly motivated and skilled fullstack dev with a strong foundation in Web technologies.
    Seeking a challenging position to utilize my knowledge and skills in developing user-friendly and appealing apps.
    Driven by a passion for creating user-centric products that deliver maximum value and utility.
  `,
  gitHubLink: 'https://github.com/Unf0rgettab1e',
  gitHubName: 'Unf0rgettab1e',
  photo: 'https://avatars.githubusercontent.com/u/62406462?v=4',
  contributions: [
    'Basket Page Implementation 🛒',
    'Main Page Enhancements and Layout 🖥️',
    'Comprehensive README 📝',
    'Detailed Product Page Implementation 🔎',
    'Registration Page Implementation 🖊️',
    'CommerceTools Project ⚙',
  ],
};

persons.push(Unforgettable, FYMG, RemAntof);

export default persons;
