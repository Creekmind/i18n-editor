module.exports = {
  root          : true,
  env           : {
    node : true
  },
  extends       : [
    'plugin:vue/vue3-essential',
    '@vue/standard',
    '@vue/typescript/recommended'
  ],
  parserOptions : {
    ecmaVersion : 2020
  },
  rules         : {
    'no-console'                  : process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger'                 : process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'key-spacing'                 : 'off',
    'no-extra-semi'               : 'off',
    'semi'                        : 'off',
    'no-undef-init'               : 'off',
    'no-trailing-spaces'          : 'off',
    'space-before-function-paren' : 'off',
    'no-multi-spaces'             : 'off',
  }
};
