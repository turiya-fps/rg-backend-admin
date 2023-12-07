import replace from '@rollup/plugin-replace';
import react from '@vitejs/plugin-react';
import { defineConfig as configure } from 'vite';

const env = process.env.NODE_ENV ?? 'development';

// https://vitejs.dev/config/
export default configure({
  plugins: [
    react(),
    replace({
      preventAssignment: true,
      values: {
        // These debug symbols will need to be defined in the vitest.config.ts also.
        'DEBUG_API': env === 'production' ? 'false' : 'true',
        'DEBUG_STORE': env === 'production' ? 'false' : 'true',
      },
    }),
  ],
});
