module.exports = {
  extends: ['airbnb-base', 'prettier'],
  rules: {
    'no-unused-vars': 'warn',
    'no-underscore-dangle': 0,
  },
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', 'src/'],
      },
    },
  },
};
