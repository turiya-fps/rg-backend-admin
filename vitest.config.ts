import { defineConfig as configure } from 'vitest/config';

export default configure({
  // Ensure all debug symbols are disabled for testing.
  define: {
    DEBUG_API: 'false',
    DEBUG_STORE: 'false',
  },

  test: {
    globals: true,
    environment: 'happy-dom',

    include: [
      'src/**/*.test.{ts,tsx}',
    ],

    deps: {
      // "If your environment is node, Vitest will not resolve invalid named exports .."
      // We sadly have some packages that have broken named exports so we need this enabled.
      // @see https://github.com/vitest-dev/vitest/releases/tag/v0.26.0
      interopDefault: true,
    },

    coverage: {
      provider: 'v8',
      all: true,
      clean: true,
      skipFull: true,

      include: [
        'src/**/*',
      ],

      exclude: [
        'src/**/*.test.ts',
        'src/**/*.d.ts',

        // We are not testing the coverage of react components.
        'src/**/*.tsx',

        // These directories are not priorities for testing at the moment.
        // At some point we can look at implementing tests for them.
        'src/hooks/**',
        'src/testing/**',
      ],

      reportsDirectory: 'build/coverage',
      reporter: ['text', 'html'],

      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100,
    },
  },
});
