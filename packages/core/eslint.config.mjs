import js from '@eslint/js';
import ts from 'typescript-eslint';

/**
 * Lint rules for @bcn/core.
 *
 * The package declared a `lint` script from the day it was created but never
 * carried a config, so `npm run lint` failed at the workspace root — the
 * failure was in the tooling, not the code.
 *
 * These are deliberately not the web app's rules. `eslint-config-next` brings
 * React, JSX and Next-specific checks, none of which can apply here: this
 * package is framework-free by contract and is consumed by React Native as
 * well as by the website.
 */
export default ts.config(
  { ignores: ['dist/**'] },
  js.configs.recommended,
  ...ts.configs.recommended,
  {
    files: ['**/*.ts'],
    rules: {
      // Unused args are allowed when prefixed with an underscore, which is the
      // convention already used across this codebase.
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },
);
