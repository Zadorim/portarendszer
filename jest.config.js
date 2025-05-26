export default {
  verbose: true,
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  moduleNameMapper: {
    // Bootstrap ikonok vagy egyéb assetek mockolása
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest"
  },
  moduleFileExtensions: ["js", "jsx"],
  testMatch: ["**/?(*.)+(test).jsx"], // például: Navbar.test.jsx
};

