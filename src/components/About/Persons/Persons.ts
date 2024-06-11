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
  bio: 'Born in Belarus, I moved to Poland at the age of 17 to pursue my education. I graduated from the Warsaw University of Technology and currently work as a data analyst at a building company. With a strong passion for technology and web development, I am now looking forward to securing my first job offer as a frontend developer.',
  gitHubLink: 'https://github.com/RemAntof',
  gitHubName: 'RemAntof',
  photo:
    'https://avatars.githubusercontent.com/u/87061061?s=400&u=1518b90e04897ccae793ea9971f86be510e5d681&v=4',
  contributions: [
    'Task Board Setup 📋',
    'Login Page Implementation 🖥️',
    'User Profile Page Implementation 👥',
  ],
};
const FYMG: Person = {
  name: 'Artem',
  role: 'Brain',
  bio: 'Born in Belarus, I moved to Poland at the age of 17 to pursue my education. I graduated from the Warsaw University of Technology and currently work as a data analyst at a building company. With a strong passion for technology and web development, I am now looking forward to securing my first job offer as a frontend deve',
  gitHubLink: 'https://github.com/FYMG',
  gitHubName: 'FYMG',
  photo: 'https://avatars.githubusercontent.com/u/34478249?v=4',
  contributions: [
    'Comprehensive README 📝',
    'Development Environment Configuration ⚙️',
    'Set up CI/CD pipeline 🚀',
    'Routing Implementation 🚦',
    'Catalog Page Implementation 📚',
  ],
};
const Unforgettable: Person = {
  name: 'Tony Davydchyk',
  role: 'Team Lead',
  bio: 'Born in Belarus, I moved to Poland at the age of 17 to pursue my education. I graduated from the Warsaw University of Technology and currently work as a data analyst at a building company. With a strong passion for technolo',
  gitHubLink: 'https://github.com/Unf0rgettab1e',
  gitHubName: 'Unf0rgettab1e',
  photo: 'https://avatars.githubusercontent.com/u/62406462?v=4',
  contributions: [
    'Repository Setup 🧐',
    'CommerceTools Project and API Client Setup 💻',
    'Registration Page Implementation 🖊️',
    'Detailed Product Page Implementation 🔎',
  ],
};

persons.push(Unforgettable, FYMG, RemAntof);

export default persons;
