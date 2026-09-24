import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

/**
 * Tests run with no config until now, which worked only because every test
 * imported by relative path. A test that imports anything through the `@/`
 * alias — the way the application itself imports — failed to load with
 * "Cannot find package '@/…'", and vitest reports that as a suite with no
 * tests rather than as a failure, so it was silent. Teaching vitest the
 * same alias tsconfig already defines keeps the two in step.
 */
export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
