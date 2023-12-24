module.exports = {
  root: true,
  extends: ['taro/react', 'prettier'],
  plugins: ['prettier'],
  parser: ['@typescript-eslint/parser'],
  rules: {
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'import/no-commonjs': 0,
  },
};
