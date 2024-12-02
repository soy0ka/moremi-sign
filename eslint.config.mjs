// eslint.config.mjs
import typescriptPlugin from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'
import prettier from 'eslint-plugin-prettier'

export default [
  {
    files: ['src/**/*.ts', 'test/**/*.ts'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: typescriptParser,
      globals: {
        process: 'readonly',
        __dirname: 'readonly',
        module: 'readonly',
        require: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin,
      prettier: prettier,
    },
    rules: {
      ...typescriptPlugin.configs.recommended.rules,
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          semi: false,
        },
      ],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-unused-vars': ['warn'],
      '@typescript-eslint/no-explicit-any': 'off',

      // ESLint와 Prettier의 충돌 가능성이 있는 규칙 비활성화
      quotes: 'off', // Prettier가 자체적으로 처리
      semi: 'off', // Prettier가 자체적으로 처리
      'arrow-body-style': 'off',
      'prefer-arrow-callback': 'off',
      'no-mixed-operators': 'off',
      'no-multiple-empty-lines': 'off',
      'no-extra-semi': 'off',
      'no-floating-decimal': 'off',
      'space-before-function-paren': 'off',
      'comma-dangle': 'off',
    },
    ignores: ['**/node_modules/**', '**/dist/**'],
  },
]
