import js from '@eslint/js';
import react from 'eslint-plugin-react';
import reactRecommended from 'eslint-plugin-react/configs/recommended.js';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
  js.configs.recommended,
  reactRecommended,
  prettierConfig,
  {
    files: ['**/*.jsx', '**/*.js'],
    plugins: {
      react,
      prettier,
    },
    rules: {
      'prettier/prettier': 'error',
      'react/react-in-jsx-scope': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    languageOptions: {
      ecmaVersion: 'latest', // Enables modern JavaScript
      sourceType: 'module', // Allows ES module syntax
      globals: {
        window: 'readonly', // Recognize browser-specific globals
        document: 'readonly',
        console: 'readonly',
      },
    },
  },
];
