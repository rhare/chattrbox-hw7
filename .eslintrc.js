module.exports = {
  "env": {
      "browser": true
  },
  "extends": "eslint:recommended",
  "globals": {
    "require": false,
    "module": false,
    "__dirname": true
  },
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "rules": {
    "indent": [
      "error",
      2
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "always"
    ],
    "no-console": [
      "error", {
        "allow": ["log"]
      }
    ],
    "no-unused-vars": [
      "error", { 
        "varsIgnorePattern": "[iI]gnored"
      }
    ]
  }
};

