const eslintRules = {
  'constructor-super': 'error',
  'for-direction': 'error',
  'no-async-promise-executor': 'error',
  'no-case-declarations': 'error',
  'no-class-assign': 'error',
  'no-compare-neg-zero': 'error',
  'no-cond-assign': 'error',
  'no-const-assign': 'error',
  'no-constant-condition': 'error',
  'no-control-regex': 'error',
  'no-debugger': 'error',
  'no-delete-var': 'error',
  'no-use-before-define': 'off',
  'no-dupe-args': 'error',
  'no-dupe-class-members': 'error',
  'no-dupe-keys': 'error',
  'no-duplicate-case': 'error',
  'no-empty': 'error',
  'no-empty-character-class': 'error',
  'no-empty-pattern': 'error',
  'no-ex-assign': 'error',
  'no-fallthrough': 'error',
  'no-func-assign': 'error',
  'no-global-assign': 'error',
  'no-inner-declarations': 'error',
  'no-invalid-regexp': 'error',
  'no-misleading-character-class': 'error',
  'no-new-symbol': 'error',
  'no-obj-calls': 'error',
  'no-octal': 'error',
  'no-prototype-builtins': 'warn',
  'no-redeclare': 'off',
  'no-regex-spaces': 'error',
  'no-restricted-imports': [
    'error',
    { name: 'lodash', message: "Use chunk friendly imports for lodash like 'lodash/<fn>'" },
  ],
  'no-self-assign': 'error',
  'no-shadow-restricted-names': 'error',
  'no-sparse-arrays': 'error',
  'no-this-before-super': 'error',
  'no-unreachable': 'error',
  'no-unsafe-finally': 'error',
  'no-unsafe-negation': 'error',
  'no-unused-labels': 'error',
  'no-useless-catch': 'error',
  'no-useless-escape': 'error',
  'no-with': 'error',
  'require-yield': 'error',
  'valid-typeof': 'off',
  indent: 'off',
  camelcase: 'off',
  complexity: 'off',
  curly: 'error',
  'dot-notation': 'error',
  eqeqeq: ['error', 'smart'],
  'id-blacklist': 'off',
  'id-match': 'error',
  'import/prefer-default-export': 'error',
  'import/order': 'off',
  'max-classes-per-file': 'off',
  'no-bitwise': 'error',
  'no-caller': 'error',
  'no-console': 'error',
  'no-eval': 'error',
  'no-invalid-this': 'off',
  'no-new-wrappers': 'error',
  'no-shadow': 'off',
  'no-undef-init': 'error',
  'no-unused-expressions': [
    'error',
    {
      allowShortCircuit: true,
      allowTernary: true,
    },
  ],
  'no-var': 'error',
  'object-shorthand': 'error',
  'one-var': ['error', 'never'],
  'prefer-const': 'off',
  'prefer-object-spread': 'error',
  radix: 'error',
  'spaced-comment': ['off', 'never'],
  'prefer-rest-params': 'off',
  'react-data-attr/deny-upper-case': 2,
};

const reactRules = {
  'react/no-children-prop': 'warn',
  'react/display-name': 'off',
  'react/prop-types': 'off',
  'react/no-find-dom-node': 'warn',
  'react/self-closing-comp': 'error',
  'react/no-string-refs': 'error',
  'react/jsx-key': 'error',
  'react/no-unescaped-entities': 'off',
  'react/jsx-no-comment-textnodes': 'off',
};

const reactHooksRules = {
  'react-hooks/rules-of-hooks': 'error',
  'react-hooks/exhaustive-deps': 'off',
};

const tsRules = {
  '@typescript-eslint/explicit-function-return-type': 'off',
  '@typescript-eslint/ban-ts-comment': 'warn',
  '@typescript-eslint/no-redeclare': ['error'],
  '@typescript-eslint/camelcase': 'off',
  '@typescript-eslint/no-unused-vars': [
    'error',
    { argsIgnorePattern: '^_', ignoreRestSiblings: true },
  ],
  '@typescript-eslint/no-non-null-assertion': 'off',
  '@typescript-eslint/adjacent-overload-signatures': 'error',
  '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
  '@typescript-eslint/no-shadow': ['error'],
  '@typescript-eslint/ban-types': [
    'error',
    {
      extendDefaults: true,
      types: {
        '{}': false,
        Function: false,
      },
    },
  ],
  '@typescript-eslint/naming-convention': ['error', { selector: 'class', format: ['PascalCase'] }],
  '@typescript-eslint/consistent-type-assertions': [
    'warn',
    {
      assertionStyle: 'as',
      objectLiteralTypeAssertions: 'never',
    },
  ],
  '@typescript-eslint/consistent-type-definitions': 'error',
  '@typescript-eslint/explicit-member-accessibility': [
    'off',
    {
      accessibility: 'explicit',
    },
  ],
  '@typescript-eslint/interface-name-prefix': 'off',
  '@typescript-eslint/member-ordering': 'error',
  '@typescript-eslint/no-empty-function': 'error',
  '@typescript-eslint/no-empty-interface': 'error',
  '@typescript-eslint/no-explicit-any': 'error',
  '@typescript-eslint/no-for-in-array': 'error',
  '@typescript-eslint/no-misused-new': 'error',
  '@typescript-eslint/no-namespace': 'error',
  '@typescript-eslint/no-parameter-properties': 'off',
  '@typescript-eslint/no-var-requires': 'off',
  '@typescript-eslint/prefer-for-of': 'off',
  '@typescript-eslint/no-use-before-define': 'error',
  '@typescript-eslint/prefer-function-type': 'error',
  '@typescript-eslint/prefer-namespace-keyword': 'error',
  '@typescript-eslint/quotes': [
    'error',
    'single',
    {
      avoidEscape: true,
    },
  ],
  '@typescript-eslint/triple-slash-reference': 'error',
  '@typescript-eslint/type-annotation-spacing': 'off',
  '@typescript-eslint/unified-signatures': 'error',
  '@typescript-eslint/prefer-optional-chain': 'off',
  '@typescript-eslint/no-unnecessary-type-assertion': 'warn',
  '@typescript-eslint/prefer-nullish-coalescing': 'off',
  '@typescript-eslint/promise-function-async': 'error',
};

const jestRules = {
  'jest/no-focused-tests': 'error',
};

const rules = {
  ...eslintRules,
  ...reactRules,
  ...reactHooksRules,
  ...tsRules,
  // ...jestRules,
};

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2018,
    ecmaFeatures: {
      jsx: true,
    },
    project: ['./tsconfig.json'],
  },
  ignorePatterns: ['webpack.*', 'jest.*'],
  plugins: [
    '@typescript-eslint',
    'react',
    'react-hooks',
    'import',
    'react-data-attr'
  ],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules
};
